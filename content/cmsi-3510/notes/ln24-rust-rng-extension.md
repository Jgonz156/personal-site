# LN24 Extension: Tracing the U-Bend in Rust

## Status

Draft / future extension — not yet integrated into LN24.

## Motivation

In LN23, students trace a `read()` on `/dev/urandom` all the way from `strace` output through `kallsyms` to the actual C source in `drivers/char/random.c`. They see `urandom_fops`, `urandom_read_iter()`, `crng_make_state()`, `copy_to_iter()`, and `memzero_explicit()`. This creates a natural bridge to LN24's coverage of Rust in the Linux kernel: "What does this same dispatch pattern look like when the language enforces safety at compile time?"

## Key Finding

`/dev/urandom` has **not** been rewritten in Rust and is unlikely to be — it is one of the most security-critical files in the kernel, extensively rewritten in C by Jason Donenfeld in 2022, and maintained with extreme care. The Rust-for-Linux strategy targets leaf drivers (network, block, GPIO) where safety benefits are highest and risk is lowest.

However, two Rust-side artifacts connect directly to the `urandom` path students just traced:

### 1. `rust/kernel/random.rs` — Consuming the Driver

Exists in linux-next. Provides safe Rust bindings wrapping the C random functions:

- `getrandom(dest: &mut [u8])` — fills a slice with random bytes from the kernel CSPRNG
- `getrandom_nonblock(dest: &mut [u8])` — non-blocking variant, returns `EAGAIN` if unseeded

These call the same `get_random_bytes()` / `wait_for_random_bytes()` that `urandom_read_iter()` dispatches to. A Rust kernel module calling `kernel::random::getrandom()` follows the same U-bend: Rust FFI → C `get_random_bytes()` → `crng_make_state()` → ChaCha20 → `copy_to_user()`.

**Pedagogical angle:** The U-bend is identical; only the top of the left side changes from C to Rust. Students can see that Rust modules are first-class consumers of the same kernel infrastructure.

- Source (linux-next): https://git.kernel.org/pub/scm/linux/kernel/git/next/linux-next.git/tree/rust/kernel/random.rs
- Rust-for-Linux docs: https://rust-for-linux.github.io/docs/kernel/random/fn.getrandom.html

### 2. `kernel::hwrng` — The Rust `file_operations` for RNG

The kernel provides a Rust trait-based API for hardware random number generator drivers:

- `kernel::hwrng::Operations` trait — the Rust equivalent of `struct file_operations` for hardware RNG devices
- `kernel::hwrng::Registration` struct — handles driver registration/deregistration

This is the Rust analog of what `urandom_fops` is in C: a dispatch table implemented as a trait rather than a struct of function pointers. The compiler enforces that all required callbacks are implemented, that types are correct, and that lifetimes are sound — exactly the "code is lava" guarantees LN19 argued were needed.

**Real-world example:** A [Rust port of the BCM2835 HWRNG driver](https://github.com/nikosmar/bcm2835_rust_driver) (Raspberry Pi) exists as a diploma thesis project. It implements the `Operations` trait and registers with the hwrng subsystem, feeding entropy into the same pool that `urandom_read_iter()` draws from.

- Rust-for-Linux docs: https://rust-for-linux.github.io/docs/kernel/hwrng/index.html
- BCM2835 Rust driver: https://github.com/nikosmar/bcm2835_rust_driver

### 3. Character Device Abstractions (In Progress)

A patch series by Josef Zoller (Oct 2024) introduces general Rust character device abstractions:

- `CharDevice` and `OpenCharDevice` traits
- Supported ops: `open`, `release`, `read`, `write`, `ioctl`, `llseek`
- Automatic major number assignment

This is the general-purpose Rust equivalent of `struct file_operations` for any character device. Once merged, it would theoretically be possible to write a character device driver in Rust that registers the same way `urandom_fops` does.

- LKML patch: https://lkml.iu.edu/2410.1/07277.html

## Possible Integration Approaches

### Option A: Side-by-Side Comparison (Shorter)

After LN24's existing Rust kernel module discussion, add a section showing:

1. The C `urandom_fops` struct from LN23 (students already know this)
2. The Rust `hwrng::Operations` trait as "what this looks like in Rust"
3. Key differences: trait vs. struct-of-function-pointers, compile-time enforcement vs. runtime dispatch, lifetime tracking vs. manual cleanup

This reinforces the "same architecture, safer language" message without requiring students to read a full Rust driver.

### Option B: Trace the Full Path (Longer)

A more ambitious extension that traces a Rust kernel module consuming randomness:

1. Show a minimal Rust kernel module that calls `kernel::random::getrandom()`
2. Trace the call through FFI into C `get_random_bytes()`
3. Show that it hits the same `crng_make_state()` → ChaCha20 → `copy_to_user()` path
4. Point out: the entropy *provider* side (hwrng) can also be Rust, so the kernel is gradually gaining Rust at both ends of the pipeline while the core CSPRNG remains battle-tested C

### Option C: The BCM2835 Case Study (Most Concrete)

Use the BCM2835 Rust HWRNG driver as a real-world case:

1. Show the C version (`drivers/char/hw_random/bcm2835-rng.c`) — ~100 lines
2. Show the Rust version — same functionality, but with trait-based registration
3. Discuss what the Rust version prevents: use-after-free on the MMIO region, missing cleanup on error paths, type confusion in the ops struct
4. Connect back: this Rust driver feeds entropy into the same pool that `urandom_read_iter()` draws from

## Relevant Kernel Versions

- VM runs kernel 6.8
- `drivers/char/random.c` source: https://github.com/torvalds/linux/blob/v6.8/drivers/char/random.c
- Rust random bindings appeared in linux-next (not yet in stable 6.8)
- The `CharDevice` trait patches target future kernels (post-6.12)

## Dependencies

- Requires LN23's "Following the Dispatch to the Driver" section (students must have seen `urandom_fops` and `urandom_read_iter()`)
- Requires LN24's existing Rust-in-Linux introduction
