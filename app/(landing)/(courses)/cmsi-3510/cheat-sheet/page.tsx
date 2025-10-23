"use client"

import { useEffect } from "react"
import { useNavbar } from "@/components/navbar-context"

export default function CMSI3510CheatSheet() {
  const { setPageSections } = useNavbar()

  useEffect(() => {
    setPageSections([
      { id: "cpu-architecture", title: "CPU Architecture" },
      { id: "memory-ram", title: "Memory (RAM)" },
      { id: "storage-systems", title: "Storage Systems" },
      { id: "io-systems", title: "I/O Systems" },
    ])

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">
        CMSI 3510: Operating Systems - Cheat Sheet
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {/* CPU Architecture Section */}
        <section id="cpu-architecture" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-2">
            CPU Architecture
          </h2>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Key Components</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Control Unit (CU):</strong> Directs operations of the
                processor, fetches instructions from memory, decodes them, and
                coordinates execution
              </li>
              <li>
                <strong>Arithmetic Logic Unit (ALU):</strong> Performs
                arithmetic and logical operations
              </li>
              <li>
                <strong>Registers:</strong> Small, fast storage locations within
                the CPU
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>Program Counter (PC):</strong> Holds address of next
                    instruction
                  </li>
                  <li>
                    <strong>Instruction Register (IR):</strong> Holds current
                    instruction being executed
                  </li>
                  <li>
                    <strong>Stack Pointer (SP):</strong> Points to top of the
                    stack
                  </li>
                  <li>
                    <strong>General Purpose Registers:</strong> Store operands
                    and intermediate results
                  </li>
                </ul>
              </li>
              <li>
                <strong>Cache Memory:</strong> Fast memory between CPU and main
                memory
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>L1 Cache:</strong> Smallest, fastest (~32-64 KB per
                    core, ~1-2ns access time)
                  </li>
                  <li>
                    <strong>L2 Cache:</strong> Medium size (~256 KB - 1 MB per
                    core, ~4-10ns)
                  </li>
                  <li>
                    <strong>L3 Cache:</strong> Largest, shared across cores
                    (~8-32 MB, ~10-20ns)
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Instruction Cycle (Fetch-Decode-Execute)
            </h3>
            <div className="bg-background/50 p-4 rounded font-mono text-sm mb-3">
              <pre>
                {`1. FETCH:    PC → MAR → Memory → MDR → IR
             PC = PC + 1
2. DECODE:   IR → Control Unit (decode instruction)
3. EXECUTE:  Perform operation (ALU, memory access, etc.)
4. STORE:    Write results back to registers/memory`}
              </pre>
            </div>
            <p className="text-sm">
              <strong>MAR:</strong> Memory Address Register |{" "}
              <strong>MDR:</strong> Memory Data Register
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">CPU Modes</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>User Mode:</strong> Limited privileges, cannot execute
                privileged instructions, used for user applications
              </li>
              <li>
                <strong>Kernel Mode (Supervisor Mode):</strong> Full privileges,
                can execute all instructions, access all memory, control
                hardware
              </li>
              <li>
                <strong>Mode Switching:</strong> Triggered by system calls,
                interrupts, or exceptions
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Interrupts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hardware Interrupts:</strong> Generated by hardware
                devices (I/O completion, timer, etc.)
              </li>
              <li>
                <strong>Software Interrupts (Traps):</strong> Generated by
                software (system calls, exceptions)
              </li>
              <li>
                <strong>Interrupt Handling:</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Save current state (PC, registers)</li>
                  <li>
                    Load interrupt handler address from Interrupt Vector Table
                    (IVT)
                  </li>
                  <li>Execute interrupt handler in kernel mode</li>
                  <li>Restore saved state and return to user mode</li>
                </ol>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Pipelining</h3>
            <p className="mb-3">
              CPU technique to increase instruction throughput by overlapping
              execution stages
            </p>
            <div className="bg-background/50 p-4 rounded font-mono text-sm">
              <pre>
                {`Classic 5-Stage Pipeline:
1. IF  - Instruction Fetch
2. ID  - Instruction Decode
3. EX  - Execute
4. MEM - Memory Access
5. WB  - Write Back

Time  | IF | ID | EX | MEM | WB |
------|----|----|----|----|-----|
T1    | I1 |    |    |    |     |
T2    | I2 | I1 |    |    |     |
T3    | I3 | I2 | I1 |    |     |
T4    | I4 | I3 | I2 | I1 |     |
T5    | I5 | I4 | I3 | I2 | I1  |`}
              </pre>
            </div>
            <p className="mt-3 text-sm">
              <strong>Hazards:</strong> Data hazards, control hazards
              (branches), structural hazards
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Multi-Core & Multiprocessing
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Symmetric Multiprocessing (SMP):</strong> Multiple
                identical processors share memory and I/O
              </li>
              <li>
                <strong>Multi-Core:</strong> Multiple CPU cores on a single chip
              </li>
              <li>
                <strong>Hyper-Threading:</strong> Single physical core appears
                as multiple logical cores
              </li>
              <li>
                <strong>Cache Coherence:</strong> Ensures consistency when
                multiple cores cache same memory location (MESI protocol:
                Modified, Exclusive, Shared, Invalid)
              </li>
            </ul>
          </div>
        </section>

        {/* Memory (RAM) Section */}
        <section id="memory-ram" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-2">
            Memory (RAM)
          </h2>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Memory Hierarchy</h3>
            <div className="bg-background/50 p-4 rounded font-mono text-sm">
              <pre>
                {`Fastest/Smallest                    Slowest/Largest
┌─────────────┐
│  Registers  │ <1 ns, bytes to KB
├─────────────┤
│  L1 Cache   │ 1-2 ns, ~32-64 KB
├─────────────┤
│  L2 Cache   │ 4-10 ns, ~256 KB - 1 MB
├─────────────┤
│  L3 Cache   │ 10-20 ns, ~8-32 MB
├─────────────┤
│  Main RAM   │ 50-100 ns, GBs
├─────────────┤
│  SSD        │ 25-100 μs, 100s GB - TBs
├─────────────┤
│  HDD        │ 5-10 ms, TBs
└─────────────┘`}
              </pre>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Memory Types</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>DRAM (Dynamic RAM):</strong> Main memory, requires
                periodic refresh, slower but cheaper
              </li>
              <li>
                <strong>SRAM (Static RAM):</strong> Used for cache, faster,
                doesn't need refresh, more expensive
              </li>
              <li>
                <strong>DDR SDRAM:</strong> Double Data Rate, transfers on both
                clock edges (DDR3, DDR4, DDR5)
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Virtual Memory</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Purpose:</strong> Abstraction that provides each process
                with illusion of large, contiguous address space
              </li>
              <li>
                <strong>Benefits:</strong> Process isolation, efficient memory
                use, allows programs larger than physical RAM
              </li>
              <li>
                <strong>Translation:</strong> Virtual addresses → Physical
                addresses via page tables
              </li>
              <li>
                <strong>Translation Lookaside Buffer (TLB):</strong> Cache for
                page table entries, speeds up address translation
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Paging</h3>
            <p className="mb-3">
              Memory management scheme that divides memory into fixed-size
              blocks
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Page:</strong> Fixed-size block in virtual memory
                (typically 4 KB)
              </li>
              <li>
                <strong>Frame:</strong> Fixed-size block in physical memory
                (same size as page)
              </li>
              <li>
                <strong>Page Table:</strong> Maps virtual pages to physical
                frames
              </li>
              <li>
                <strong>Page Fault:</strong> Occurs when accessing page not in
                physical memory
                <ol className="list-decimal pl-6 mt-2">
                  <li>Trap to OS kernel</li>
                  <li>Save process state</li>
                  <li>Find page on disk</li>
                  <li>Load page into free frame</li>
                  <li>Update page table</li>
                  <li>Resume process</li>
                </ol>
              </li>
            </ul>
            <div className="bg-background/50 p-4 rounded font-mono text-sm mt-3">
              <pre>
                {`Virtual Address Format:
┌──────────────┬──────────────┐
│ Page Number  │    Offset    │
└──────────────┴──────────────┘

Page Table Entry (PTE):
┌─────┬─────┬───┬───┬──────────────┐
│Valid│Dirty│R/W│U/K│ Frame Number │
└─────┴─────┴───┴───┴──────────────┘`}
              </pre>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Page Replacement Algorithms
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>FIFO (First-In-First-Out):</strong> Replace oldest page,
                can suffer from Belady's anomaly
              </li>
              <li>
                <strong>LRU (Least Recently Used):</strong> Replace page not
                used for longest time, good performance but expensive
              </li>
              <li>
                <strong>LFU (Least Frequently Used):</strong> Replace page with
                lowest reference count
              </li>
              <li>
                <strong>Clock (Second Chance):</strong> Approximates LRU, uses
                reference bit, circular list
              </li>
              <li>
                <strong>Optimal:</strong> Replace page that won't be used for
                longest time (theoretical, requires future knowledge)
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Segmentation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Segments:</strong> Variable-size logical units (code,
                data, stack, heap)
              </li>
              <li>
                <strong>Segment Table:</strong> Maps segment numbers to base
                address and limit
              </li>
              <li>
                <strong>Segmentation + Paging:</strong> Combine benefits of both
                (e.g., x86-64 architecture)
              </li>
              <li>
                <strong>Fragmentation:</strong> External fragmentation possible
                with pure segmentation
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Memory Allocation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contiguous Allocation:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>First Fit:</strong> Allocate first hole that's big
                    enough
                  </li>
                  <li>
                    <strong>Best Fit:</strong> Allocate smallest hole that fits
                  </li>
                  <li>
                    <strong>Worst Fit:</strong> Allocate largest hole
                  </li>
                </ul>
              </li>
              <li>
                <strong>Non-Contiguous Allocation:</strong> Paging and
                segmentation allow non-contiguous allocation
              </li>
              <li>
                <strong>Fragmentation:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>External:</strong> Free memory scattered, can't
                    satisfy requests
                  </li>
                  <li>
                    <strong>Internal:</strong> Allocated memory larger than
                    needed, waste within allocation unit
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        {/* Storage Systems Section */}
        <section id="storage-systems" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-2">
            Storage Systems
          </h2>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Hard Disk Drives (HDD)
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Components:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>Platters:</strong> Rotating magnetic disks
                  </li>
                  <li>
                    <strong>Spindle:</strong> Rotates platters (5400-15000 RPM)
                  </li>
                  <li>
                    <strong>Read/Write Heads:</strong> Move across platter
                    surface on actuator arm
                  </li>
                  <li>
                    <strong>Tracks:</strong> Concentric circles on platter
                  </li>
                  <li>
                    <strong>Sectors:</strong> Arc segments of tracks (typically
                    512B or 4KB)
                  </li>
                  <li>
                    <strong>Cylinders:</strong> Set of tracks at same position
                    on all platters
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Access Time = Seek Time + Rotational Latency + Transfer Time
                </strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>Seek Time:</strong> Time to move head to correct
                    track (3-12 ms)
                  </li>
                  <li>
                    <strong>Rotational Latency:</strong> Time for sector to
                    rotate under head (avg = 0.5 × rotation time)
                  </li>
                  <li>
                    <strong>Transfer Time:</strong> Time to read/write data
                  </li>
                </ul>
              </li>
              <li>
                <strong>Typical Performance:</strong> 80-160 MB/s throughput,
                5-10 ms latency
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Disk Scheduling Algorithms
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>FCFS (First-Come-First-Served):</strong> Process
                requests in order, no optimization
              </li>
              <li>
                <strong>SSTF (Shortest Seek Time First):</strong> Service
                request closest to current head position, can starve distant
                requests
              </li>
              <li>
                <strong>SCAN (Elevator):</strong> Head moves in one direction,
                services requests, then reverses
              </li>
              <li>
                <strong>C-SCAN (Circular SCAN):</strong> Like SCAN but only
                services in one direction, returns to start without servicing
              </li>
              <li>
                <strong>LOOK/C-LOOK:</strong> Like SCAN/C-SCAN but only goes as
                far as last request in each direction
              </li>
            </ul>
            <div className="bg-background/50 p-4 rounded font-mono text-sm mt-3">
              <pre>
                {`Example: Current head at 50, queue: [98, 183, 37, 122, 14, 124, 65, 67]

FCFS: 50→98→183→37→122→14→124→65→67  (total: 640)
SSTF: 50→65→67→37→14→98→122→124→183  (total: 236)
SCAN: 50→37→14→0→65→67→98→122→124→183 (total: 236)`}
              </pre>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Solid State Drives (SSD)
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Technology:</strong> Flash memory (NAND), no moving
                parts
              </li>
              <li>
                <strong>Structure:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>Pages:</strong> Smallest read/write unit (4-16 KB)
                  </li>
                  <li>
                    <strong>Blocks:</strong> Smallest erase unit (128-256 pages,
                    ~512 KB - 4 MB)
                  </li>
                  <li>
                    <strong>Planes/Dies:</strong> Organized for parallel access
                  </li>
                </ul>
              </li>
              <li>
                <strong>Performance:</strong> 200-3500 MB/s (SATA) or 3500-7000
                MB/s (NVMe), 25-100 μs latency
              </li>
              <li>
                <strong>Characteristics:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Must erase before write (block-level erase)</li>
                  <li>Limited write cycles (~1000-100000 per cell)</li>
                  <li>Write amplification issue</li>
                  <li>Garbage collection needed</li>
                </ul>
              </li>
              <li>
                <strong>Flash Translation Layer (FTL):</strong> Maps logical
                blocks to physical pages, handles wear leveling, garbage
                collection
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              RAID (Redundant Array of Independent Disks)
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>RAID 0 (Striping):</strong> Data split across disks, no
                redundancy, high performance
              </li>
              <li>
                <strong>RAID 1 (Mirroring):</strong> Data duplicated on multiple
                disks, 100% overhead, high read performance
              </li>
              <li>
                <strong>RAID 5 (Striping + Parity):</strong> Data + parity
                striped across ≥3 disks, can survive 1 disk failure, (n-1)/n
                capacity
              </li>
              <li>
                <strong>RAID 6 (Double Parity):</strong> Like RAID 5 but 2
                parity blocks, survives 2 disk failures, (n-2)/n capacity
              </li>
              <li>
                <strong>RAID 10 (1+0):</strong> Mirrored pairs striped, combines
                benefits of RAID 0 and 1, 50% capacity
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">File System Basics</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>File:</strong> Named collection of related information
                stored on secondary storage
              </li>
              <li>
                <strong>Directory:</strong> Organization structure containing
                files and subdirectories
              </li>
              <li>
                <strong>Metadata:</strong> File name, size, timestamps,
                permissions, owner, location
              </li>
              <li>
                <strong>Inode (Unix/Linux):</strong> Data structure storing file
                metadata and pointers to data blocks
              </li>
              <li>
                <strong>File Allocation Methods:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>Contiguous:</strong> Consecutive blocks, fast but
                    fragmentation
                  </li>
                  <li>
                    <strong>Linked:</strong> Each block points to next, no
                    fragmentation, slow random access
                  </li>
                  <li>
                    <strong>Indexed:</strong> Index block contains pointers to
                    all data blocks
                  </li>
                  <li>
                    <strong>Multi-level Indexed:</strong> Combines direct,
                    indirect, double indirect pointers (ext2/3/4)
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Common File Systems</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>ext4:</strong> Linux default, journaling, extent-based
                allocation, up to 1 EB volume
              </li>
              <li>
                <strong>NTFS:</strong> Windows, journaling, ACLs, compression,
                encryption
              </li>
              <li>
                <strong>APFS:</strong> macOS/iOS, optimized for SSDs, snapshots,
                encryption
              </li>
              <li>
                <strong>FAT32:</strong> Simple, widely compatible, 4 GB file
                limit
              </li>
              <li>
                <strong>Btrfs/ZFS:</strong> Advanced features: snapshots,
                checksums, RAID, compression
              </li>
            </ul>
          </div>
        </section>

        {/* I/O Systems Section */}
        <section id="io-systems" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-2">
            I/O Systems
          </h2>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              I/O Hardware Components
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>I/O Devices:</strong> Keyboard, mouse, display, disk,
                network card, etc.
              </li>
              <li>
                <strong>Device Controller:</strong> Hardware interface between
                device and computer
                <ul className="list-circle pl-6 mt-2">
                  <li>Contains registers (status, command, data)</li>
                  <li>May have local buffer</li>
                  <li>Communicates via I/O ports or memory-mapped I/O</li>
                </ul>
              </li>
              <li>
                <strong>Device Driver:</strong> OS software module that
                interfaces with device controller
              </li>
              <li>
                <strong>I/O Buses:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    <strong>System Bus:</strong> CPU to memory
                  </li>
                  <li>
                    <strong>
                      PCIe (Peripheral Component Interconnect Express):
                    </strong>{" "}
                    High-speed expansion bus
                  </li>
                  <li>
                    <strong>USB (Universal Serial Bus):</strong> External
                    peripheral connection
                  </li>
                  <li>
                    <strong>SATA/NVMe:</strong> Storage connections
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">I/O Methods</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Programmed I/O (Polling):</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>CPU continuously checks device status</li>
                  <li>Simple but CPU-intensive, wasteful</li>
                  <li>Busy waiting</li>
                </ul>
              </li>
              <li>
                <strong>Interrupt-Driven I/O:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Device signals CPU when ready via interrupt</li>
                  <li>CPU can do other work while waiting</li>
                  <li>Still involves CPU for data transfer</li>
                  <li>Better CPU utilization than polling</li>
                </ul>
              </li>
              <li>
                <strong>Direct Memory Access (DMA):</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Dedicated DMA controller handles data transfer</li>
                  <li>CPU only involved at start and completion</li>
                  <li>Best for large transfers</li>
                  <li>Single interrupt after entire transfer complete</li>
                </ul>
              </li>
            </ul>
            <div className="bg-background/50 p-4 rounded font-mono text-sm mt-3">
              <pre>
                {`DMA Transfer Process:
1. CPU programs DMA controller (source, dest, size)
2. DMA controller takes control of bus
3. DMA transfers data directly between device & memory
4. DMA sends interrupt when complete
5. CPU handles interrupt, transfer finished`}
              </pre>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">I/O Software Layers</h3>
            <div className="bg-background/50 p-4 rounded font-mono text-sm mb-3">
              <pre>
                {`┌─────────────────────────────┐
│  User-Level I/O Software    │ (printf, scanf, etc.)
├─────────────────────────────┤
│  Device-Independent OS      │ (buffering, naming, error)
├─────────────────────────────┤
│  Device Drivers             │ (device-specific code)
├─────────────────────────────┤
│  Interrupt Handlers         │ (process interrupts)
├─────────────────────────────┤
│  Hardware                   │ (controllers, devices)
└─────────────────────────────┘`}
              </pre>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>User Level:</strong> Libraries and system calls (read,
                write, open, close)
              </li>
              <li>
                <strong>Device-Independent:</strong> Uniform naming, buffering,
                error handling, allocation
              </li>
              <li>
                <strong>Device Driver:</strong> Device-specific commands,
                initialization, status checks
              </li>
              <li>
                <strong>Interrupt Handler:</strong> Save context, handle
                interrupt, restore context
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">Buffering</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Purpose:</strong> Cope with speed mismatch, allow
                asynchronous operation, support copy semantics
              </li>
              <li>
                <strong>Single Buffering:</strong> OS buffer, process waits for
                I/O completion
              </li>
              <li>
                <strong>Double Buffering:</strong> Two buffers alternate (fill
                one while processing other)
              </li>
              <li>
                <strong>Circular Buffering:</strong> Ring of buffers for
                producer-consumer scenarios
              </li>
              <li>
                <strong>Buffer Cache:</strong> Keep frequently accessed blocks
                in memory (page cache in Linux)
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">I/O Performance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Reduce number of context switches</strong>
              </li>
              <li>
                <strong>Reduce data copying:</strong> Zero-copy techniques, DMA
              </li>
              <li>
                <strong>Reduce interrupt frequency:</strong> Interrupt
                coalescing, polling under high load
              </li>
              <li>
                <strong>Use DMA for large transfers</strong>
              </li>
              <li>
                <strong>Balance CPU and I/O operations</strong>
              </li>
              <li>
                <strong>Asynchronous I/O:</strong> Allow overlapping computation
                and I/O
              </li>
              <li>
                <strong>I/O Scheduling:</strong> Reorder requests for efficiency
                (disk scheduling algorithms)
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Memory-Mapped I/O vs Port-Mapped I/O
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Memory-Mapped I/O (MMIO):</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Device registers mapped into memory address space</li>
                  <li>Use regular load/store instructions</li>
                  <li>Single address space for memory and I/O</li>
                  <li>Common in modern systems</li>
                </ul>
              </li>
              <li>
                <strong>Port-Mapped I/O (PMIO):</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Separate address space for I/O devices</li>
                  <li>Special I/O instructions (IN/OUT on x86)</li>
                  <li>Better isolation between memory and I/O</li>
                  <li>Legacy approach on x86</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-muted/30 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Block vs Character Devices
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Block Devices:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    Store information in fixed-size blocks (typically 512B -
                    4KB)
                  </li>
                  <li>Random access possible</li>
                  <li>Can be buffered/cached</li>
                  <li>Examples: Hard disks, SSDs, USB drives</li>
                </ul>
              </li>
              <li>
                <strong>Character Devices:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>Stream of characters, no block structure</li>
                  <li>Sequential access, not seekable</li>
                  <li>Examples: Keyboards, mice, serial ports, terminals</li>
                </ul>
              </li>
              <li>
                <strong>Network Devices:</strong> Often handled separately with
                socket interface
              </li>
            </ul>
          </div>
        </section>

        <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 p-6 rounded">
          <p className="text-lg font-semibold mb-2">Quick Reference Summary</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>
              <strong>CPU:</strong> Control Unit + ALU + Registers + Cache |
              Modes: User/Kernel | Interrupts & System Calls
            </li>
            <li>
              <strong>Memory:</strong> Hierarchy: Registers → Cache (L1/L2/L3) →
              RAM → Disk | Virtual Memory + Paging | TLB
            </li>
            <li>
              <strong>Storage:</strong> HDD (mechanical, 5-10ms) vs SSD (flash,
              25-100μs) | RAID for redundancy | File Systems
            </li>
            <li>
              <strong>I/O:</strong> Polling → Interrupts → DMA | Device Drivers
              | Buffering | Block vs Character Devices
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
