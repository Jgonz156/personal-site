"use client"

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Link,
} from "@react-pdf/renderer"

// Syllabus data
const courseInfo = {
  title: "CMSI 3510: Operating Systems",
  institution: "Loyola Marymount University",
  semester: "Spring 2026",
  instructor: "Professor Julian Gonzalez",
  office: "Foley Annex 139",
  email: "Julian.Gonzalez@lmu.edu",
  officeHours: "M - Th 3:30 PM - 5:00 PM",
  prerequisites: "CMSI 2210 and/or CMSI 284 or EECE 3140",
  section: "Section 1: M, W Doolan Hall 222, 1:45 PM - 3:25 PM",
}

const courseDescription = [
  "This 4-unit course combines the modern development of Operating Systems with practical application in Rust. Topics include Concurrent and Parallel Programming, investigations of computer hardware architecture, Scheduling, Memory Management, I/O management, and other concepts relevant to the view of Kernel Systems.",
  "This course is offered in a synchronous, lecture-based format, meeting in person. Recordings of all lectures will be uploaded to the course site for asynchronous access, typically after class. You are encouraged to ask questions at any time during lectures.",
  "Coursework consists of programming assignments, mandatory in-class activities, as well as optional creative projects and optional final assessments for additional credit. Collaboration is encouraged, but all submitted work must be your own original work. If you work with others or use outside sources, cite them appropriately so I can accurately assess each student's understanding.",
  "This 4-unit course requires a minimum of 12 hours of work per week, in accordance with University policy. I encourage students to work consistently in manageable segments (\"chiseling\") to avoid last-minute stress. Homework assignments include checkpoints to help track progress and reinforce understanding.",
]

const learningOutcomes = [
  "Model and implement concurrent systems in Rust, explain the representations of concurrency (threads, processes, and tasks), and use synchronization primitives (e.g., mutexes, semaphores, channels) to coordinate concurrent execution.",
  "Analyze and explain computer hardware architecture at the level relevant to OS development, including memory hierarchies, processor modes, and I/O systems.",
  "Design and evaluate process scheduling algorithms, understanding trade-offs between throughput, response time, and fairness.",
  "Implement and reason about memory management systems, including virtual memory, paging, and allocation strategies.",
  "Develop system-level programs in Rust that interact with OS APIs, manage resources safely, and handle errors appropriately.",
  "Articulate the design principles and trade-offs that shape modern operating systems, including security, performance, and abstraction.",
  "Apply Rust to implement low-level system components and understand its advantages in systems programming.",
]

const requiredMaterials = [
  "A laptop/desktop with unrestricted terminal access",
  "Rust and an IDE (e.g., VSCode)",
  "Reliable internet access",
]

const textbooks = [
  "The Rust Programming Language Book (free online at doc.rust-lang.org/book/)",
  "Operating Systems and Middleware: Supporting Controlled Interaction by Max Hailperin",
]

const courseStructure = [
  { standard: "Syllabus", assignments: "HW0 (3 pts), OHW0 (1 pt), EX S0 (1 pt)", points: "5 (bonus)" },
  { standard: "Concurrent Programming", assignments: "HW1 (30 pts), HW2 (30 pts), AC1 (30 pts), OHW1 (20 pts), OHW2 (20 pts)", points: "80 needed" },
  { standard: "CPU", assignments: "HW3 (30 pts), AC2 (30 pts), OHW3 (20 pts)", points: "50 needed" },
  { standard: "Memory", assignments: "HW4 (30 pts), OHW4 (20 pts)", points: "20 needed" },
  { standard: "I/O and Networking", assignments: "HW5 (30 pts), AC3 (30 pts), OHW5 (20 pts)", points: "50 needed" },
  { standard: "Final", assignments: "OEX S1 (10 pts), OEX S2 (10 pts), OEX S3 (10 pts), OEX S4 (10 pts)", points: "40 Available" },
]

const assignmentPolicies = [
  { title: "Homework", description: "Each standard has a primary homework (HW) and an optional homework (OHW) targeting the previous standard. Homeworks consist of hands-on Rust programming assignments that apply course concepts. All homework, optional or otherwise, is due on Fridays." },
  { title: "Activities", description: "Activities (AC) are mandatory in-class participation days that provide hands-on experience with course concepts. These are graded on attendance and participation. Dates will be announced well in advance." },
  { title: "Unexcused Extensions", description: "Automatic, unexcused extensions are available: turning in a homework on Saturday results in a 5pt deduction. Turning it in on Sunday gives you the previous 5-point penalty and an additional 10-point deduction. Submitting after Sunday without an excuse results in the loss of all points." },
  { title: "Excused Extensions", description: "Medical or personal emergencies can receive additional extensions with email communication requesting it." },
  { title: "Exams", description: "The Final is optional. It provides focused opportunities to boost scores in prior standards. If you have reached the point total required to pass a standard, then it is optional." },
  { title: "Submission", description: "Assignments and exams are submitted through Brightspace. Grades and private materials will be posted there as well." },
]

const scheduleData = [
  { date: "Jan 12 (Mon)", type: "Lecture", details: "(LN0) Syllabus Day" },
  { date: "Jan 14 (Wed)", type: "Lecture", details: "(LN1) Introduction to The Rust Programming Language" },
  { date: "Jan 18 (Sun)", type: "Exam", details: "Syllabus Exam Release" },
  { date: "Jan 19 (Mon)", type: "Holiday", details: "Martin Luther King Jr. Day - No Class" },
  { date: "Jan 21 (Wed)", type: "Lecture", details: "(LN2) Variables and Data Types" },
  { date: "Jan 23 (Fri)", type: "Homework", details: "HW0 Due" },
  { date: "Jan 24 (Sat)", type: "Exam", details: "Syllabus Exam Due" },
  { date: "Jan 26 (Mon)", type: "Lecture", details: "(LN3) Functions and The Owner/Borrow System" },
  { date: "Jan 28 (Wed)", type: "Lecture", details: "(LN4) Higher Order Functions and Memory Management" },
  { date: "Feb 2 (Mon)", type: "Lecture", details: "(LN5) OOP, Structs, Traits, and Enums" },
  { date: "Feb 4 (Wed)", type: "Lecture", details: "(LN6) Threads and The History of Operating Systems" },
  { date: "Feb 9 (Mon)", type: "Lecture", details: "(LN7) Introduction to Parallel Programming Theory" },
  { date: "Feb 11 (Wed)", type: "Activity", details: "(AC1) Getting Folded" },
  { date: "Feb 13 (Fri)", type: "Homework", details: "HW1 Due" },
  { date: "Feb 16 (Mon)", type: "Lecture", details: "(LN8) Introduction to CPU Architectures" },
  { date: "Feb 18 (Wed)", type: "Lecture", details: "(LN9) The Process" },
  { date: "Feb 23 (Mon)", type: "Lecture", details: "(LN10) The Scheduling Problem" },
  { date: "Feb 25 (Wed)", type: "Lecture", details: "(LN11) The Scheduling Problem Continued" },
  { date: "Feb 27 (Fri)", type: "Homework", details: "HW2 Due" },
  { date: "Mar 2–6", type: "Holiday", details: "Spring Break – No Class" },
  { date: "Mar 9 (Mon)", type: "Lecture", details: "(LN12) Deadlocks and Resource Contention" },
  { date: "Mar 11 (Wed)", type: "Lecture", details: "(LN13) Introduction to Memory Architecture" },
  { date: "Mar 16 (Mon)", type: "Lecture", details: "(LN14) Memory Allocation and Fragmentation" },
  { date: "Mar 18 (Wed)", type: "Activity", details: "(AC2) Saved by The Schedule" },
  { date: "Mar 23 (Mon)", type: "Lecture", details: "(LN15) Logical vs Physical Addressing and Virtual Memory" },
  { date: "Mar 25 (Wed)", type: "Lecture", details: "(LN16) Paging and Segmentation" },
  { date: "Mar 27 (Fri)", type: "Homework", details: "HW3 Due" },
  { date: "Mar 30–Apr 3", type: "Holiday", details: "Easter Break – No Class" },
  { date: "Apr 6 (Mon)", type: "Lecture", details: "(LN17) Introduction to I/O Architecture" },
  { date: "Apr 8 (Wed)", type: "Lecture", details: "(LN18) Direct Memory Access and Drivers" },
  { date: "Apr 13 (Mon)", type: "Lecture", details: "(LN19) Introduction to Networking" },
  { date: "Apr 15 (Wed)", type: "Lecture", details: "(LN20) Network Traffic and Routing" },
  { date: "Apr 17 (Fri)", type: "Homework", details: "HW4 Due" },
  { date: "Apr 20 (Mon)", type: "Lecture", details: "(LN21) Introduction to Virtualization" },
  { date: "Apr 22 (Wed)", type: "Lecture", details: "(LN22) Virtualization Continued" },
  { date: "Apr 27 (Mon)", type: "Activity", details: "(AC3) Ring Around the I/Osie" },
  { date: "Apr 29 (Wed)", type: "Lecture", details: "(LN23) Linux Architecturally" },
  { date: "May 4 (Mon)", type: "Lecture", details: "(LN24) Linux Architecturally Continued" },
  { date: "May 6 (Wed)", type: "Holiday", details: "Reading Day – No Class" },
  { date: "May 7 (Thu)", type: "Exam", details: "Final Exam Release" },
  { date: "May 8 (Fri)", type: "Homework", details: "HW5 Due" },
  { date: "May 13 (Wed)", type: "Exam", details: "Final Exam Due" },
]

const studentResponsibilities = [
  { title: "Academic Honesty Policy", description: "Loyola Marymount University is a community dedicated to academic excellence. Academic honesty in scholarship and creative work stands at the center of LMU's academic life. Violations of academic honesty undermine the fundamental educational mission of the University and cannot be tolerated.", url: "https://academics.lmu.edu/honesty/" },
  { title: "Disability Support Services", description: "The mission of the Disability Support Services (DSS) Office at LMU is to provide equal access and opportunities for students with established disabilities.", url: "https://academics.lmu.edu/dss/" },
  { title: "LMU Expectation for Classroom Behavior", description: "Disruptive behavior which is persistent or significantly interferes with classroom activities may be subject to disciplinary action.", url: "https://studentaffairs.lmu.edu/student-conduct/" },
  { title: "Reporting of Sexual or Interpersonal Misconduct", description: "LMU is dedicated to the prevention of such misconduct and to providing a caring, supportive and effective response when such misconduct occurs.", url: "https://studentaffairs.lmu.edu/wellness/title9/" },
  { title: "Communication Expectations", description: "Official communication must occur through LMU-approved channels (student email, Department Teams/Slack, or letters on official LMU letterhead). Students are responsible for regularly checking their LMU email." },
  { title: "Emergency Preparedness", description: "Building a more resilient LMU is a shared responsibility among all students, faculty, and staff.", url: "https://admin.lmu.edu/emergency/" },
]

const studentServices = [
  { abbr: "COC", name: "Community of Care", description: "A collaborative case-management program to enhance community safety and student well-being." },
  { abbr: "LION", name: "LION Connect", description: "A comprehensive portal designed to empower students to take control of their academic journey." },
  { abbr: "EIS", name: "Ethnic and Intercultural Services", description: "Supports the intercultural learning and development of students from historically underrepresented backgrounds." },
  { abbr: "CSCR", name: "Center for Student Collegiate Recovery", description: "Provides a comfortable space and supportive community for students in recovery." },
  { abbr: "OISS", name: "Office for International Students and Scholars", description: "Serves as a resource ensuring regulatory compliance for international students." },
  { abbr: "OSCCR", name: "Office of Student Conduct and Community Responsibility", description: "Committed to fostering an environment conducive to the pursuit of knowledge." },
  { abbr: "CSA", name: "Pam Rector Center for Service and Action", description: "Offers opportunities to volunteer time serving those disadvantaged or oppressed." },
  { abbr: "SES", name: "Student Employment Services", description: "Provides part-time employment opportunities and workshops." },
  { abbr: "SHS", name: "Student Health Services", description: "A full-service medical office accredited by AAAHC." },
  { abbr: "SPS", name: "Student Psychological Services", description: "Facilitates student growth by providing high quality, confidential psychological services." },
  { abbr: "ARC", name: "Academic Resource Center", description: "Provides Course Tutoring, Writing Tutoring, and Academic Coaching." },
  { abbr: "ITS", name: "Information Technology Services", description: "Enables technologically-rich learning environments." },
]

const faqData = [
  { q: "What if I miss the exam due date?", a: "Unlike the assignments, which have an optional unexcused extension you can take for a point-loss, if you miss the due date for an exam that's just it. I made the exams purposefully straightforward and non-time consuming to avoid any scheduling issues." },
  { q: "Are AI tools allowed in your course?", a: "Yes! I'd rather you know the appropriate use of a tool rather than trying to use it behind my back to disastrous results. Don't ask ChatGPT to do the problem—ask it for ideas on what to do instead!" },
  { q: "Is participation mandatory?", a: "Nope. If you are the type of learner that performs better just listening quietly feel free to do so! However, don't ever be afraid to ask questions!" },
  { q: "Are the workload expectations the same as in other courses?", a: "I actually want to encourage \"less\" work by getting you all to work sooner in small chunks. If you do well on the homework by chiseling away at it early, you will avoid more than half of all the assignments and still get an A!" },
  { q: "Am I allowed to have my computer/phone out during class?", a: "Yes. If a message that YOU think is important comes up and you feel you need to answer it, go ahead, just don't disrupt others." },
  { q: "Can I eat in class?", a: "If you can eat it without bothering those in your immediate area, then you are good to go. Foods that emit an \"area of effect\" are not allowed as they may be disruptive to others." },
  { q: "Can I ask for extra-credit?", a: "While it may seem harsh, no. The course is made to provide all the opportunity necessary to succeed up front." },
  { q: "Am I required to show up to class?", a: "No, you are all adult enough by now to make that decision for yourself. I'd highly recommend showing up because I constructed this class to center around the in-person experience." },
]

// Professional syllabus styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 8,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
  },
  infoBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  infoLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    width: 100,
  },
  infoValue: {
    fontSize: 9,
    color: "#444444",
    flex: 1,
  },
  paragraph: {
    fontSize: 9,
    color: "#444444",
    lineHeight: 1.5,
    marginBottom: 6,
    textAlign: "justify",
  },
  bulletList: {
    marginTop: 4,
    marginBottom: 6,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletNumber: {
    width: 16,
    fontSize: 9,
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
  },
  bullet: {
    width: 12,
    fontSize: 9,
    color: "#2563eb",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#444444",
    lineHeight: 1.4,
  },
  table: {
    marginTop: 6,
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableCell: {
    fontSize: 8,
    color: "#444444",
  },
  subSectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 4,
    marginTop: 8,
  },
  scheduleType: {
    fontSize: 7,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    textAlign: "center",
  },
  serviceItem: {
    marginBottom: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#2563eb",
  },
  serviceName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  serviceDesc: {
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.4,
  },
  faqQuestion: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 3,
  },
  faqAnswer: {
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  footerNote: {
    fontSize: 8,
    color: "#666666",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
})

const getScheduleTypeStyle = (type: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    Lecture: { bg: "#dbeafe", text: "#1d4ed8" },
    Homework: { bg: "#dcfce7", text: "#15803d" },
    Activity: { bg: "#ffedd5", text: "#c2410c" },
    Exam: { bg: "#fee2e2", text: "#dc2626" },
    Holiday: { bg: "#fef3c7", text: "#b45309" },
  }
  return colors[type] || { bg: "#f3f4f6", text: "#374151" }
}

// Syllabus Document Component
const SyllabusDocument = () => (
  <Document>
    {/* Page 1: Course Info, Description, Outcomes, Materials */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{courseInfo.title}</Text>
        <Text style={styles.subtitle}>
          {courseInfo.institution} | {courseInfo.semester}
        </Text>
      </View>

      {/* Course Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Information</Text>
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Instructor:</Text>
            <Text style={styles.infoValue}>{courseInfo.instructor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Office:</Text>
            <Text style={styles.infoValue}>{courseInfo.office}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{courseInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Office Hours:</Text>
            <Text style={styles.infoValue}>{courseInfo.officeHours}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prerequisites:</Text>
            <Text style={styles.infoValue}>{courseInfo.prerequisites}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Section:</Text>
            <Text style={styles.infoValue}>{courseInfo.section}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 8, color: "#666666", fontStyle: "italic" }}>
          Email is the preferred contact method. If my office door is open, feel free to stop by.
        </Text>
      </View>

      {/* Course Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Description</Text>
        {courseDescription.map((para, index) => (
          <Text key={index} style={styles.paragraph}>
            {para}
          </Text>
        ))}
      </View>

      {/* Learning Outcomes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Outcomes</Text>
        <Text style={styles.paragraph}>
          Modern computing often conceals its complexity behind layers of abstraction. In this course, we will strip away that sense of mystery by examining the principles and mechanisms that make modern computing possible. You will develop the following core competencies:
        </Text>
        <View style={styles.bulletList}>
          {learningOutcomes.map((outcome, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletNumber}>{index + 1}.</Text>
              <Text style={styles.bulletText}>{outcome}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Required Materials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Materials</Text>
        <Text style={styles.paragraph}>
          This course does not require students to purchase textbooks, subscriptions, paid web tools, or lab fees. You will need:
        </Text>
        <View style={styles.bulletList}>
          {requiredMaterials.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.paragraph}>
          All reading materials will be available on the course site. Primary references include:
        </Text>
        <View style={styles.bulletList}>
          {textbooks.map((book, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{book}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Page 2: Grading & Standards-Based System */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Grading & Standards-Based System</Text>
        <Text style={styles.paragraph}>
          This course uses a standards-based grading system. Grades are earned additively rather than averaged. You can recover points later if needed, ensuring early struggles do not lock in a lower grade.
        </Text>

        <Text style={styles.subSectionTitle}>Course Structure (200 Total Points)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: 100 }]}>Standard</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Assignments</Text>
            <Text style={[styles.tableHeaderCell, { width: 70, textAlign: "right" }]}>Points</Text>
          </View>
          {courseStructure.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: 100, fontFamily: "Helvetica-Bold" }]}>{row.standard}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{row.assignments}</Text>
              <Text style={[styles.tableCell, { width: 70, textAlign: "right" }]}>{row.points}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 8, color: "#666666", marginTop: 4 }}>
          Optional exams (OEXs) and homework (OHWs) provide additional opportunities to recover points in earlier standards. Activities (AC) are mandatory in-class participation days.
        </Text>
      </View>

      {/* Assignments & Policies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignments & Policies</Text>
        {assignmentPolicies.map((policy, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <Text style={styles.subSectionTitle}>{policy.title}</Text>
            <Text style={styles.paragraph}>{policy.description}</Text>
          </View>
        ))}
      </View>
    </Page>

    {/* Page 3: Course Schedule */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Schedule</Text>
        <Text style={styles.paragraph}>
          The following is a tentative schedule of topics, assignments, and important dates for the semester.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: 80 }]}>Date</Text>
            <Text style={[styles.tableHeaderCell, { width: 60 }]}>Type</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Details</Text>
          </View>
          {scheduleData.map((row, index) => {
            const typeStyle = getScheduleTypeStyle(row.type)
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: 80 }]}>{row.date}</Text>
                <View style={{ width: 60, alignItems: "flex-start" }}>
                  <Text
                    style={[
                      styles.scheduleType,
                      { backgroundColor: typeStyle.bg, color: typeStyle.text },
                    ]}
                  >
                    {row.type}
                  </Text>
                </View>
                <Text style={[styles.tableCell, { flex: 1 }]}>{row.details}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </Page>

    {/* Page 4: Student Responsibilities & Services */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Responsibilities</Text>
        <Text style={styles.paragraph}>
          This section summarizes the University rules that relate to this course and our in-person classroom environment.
        </Text>
        {studentResponsibilities.map((item, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <Text style={styles.subSectionTitle}>{item.title}</Text>
            <Text style={styles.paragraph}>{item.description}</Text>
            {item.url && (
              <Link src={item.url} style={[styles.link, { fontSize: 8 }]}>
                Learn More →
              </Link>
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Services</Text>
        <Text style={styles.paragraph}>
          As a student at LMU you have access to many services. Here are the key resources available to you:
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {studentServices.map((service, index) => (
            <View key={index} style={[styles.serviceItem, { width: "48%", marginRight: index % 2 === 0 ? "4%" : 0 }]}>
              <Text style={styles.serviceName}>
                ({service.abbr}) {service.name}
              </Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>

    {/* Page 5: FAQ */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqData.map((faq, index) => (
          <View key={index}>
            <Text style={styles.faqQuestion}>Q: {faq.q}</Text>
            <Text style={styles.faqAnswer}>A: {faq.a}</Text>
          </View>
        ))}
        <Text style={{ fontSize: 8, color: "#666666", fontStyle: "italic", marginTop: 8 }}>
          This list is subject to expand.
        </Text>
      </View>

      <Text style={styles.footerNote}>
        This syllabus is tentative and subject to change. Updates will be communicated promptly via email.
      </Text>
    </Page>
  </Document>
)

// Function to generate and download the PDF
export async function downloadSyllabusPdf() {
  const blob = await pdf(<SyllabusDocument />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "CMSI_3510_Operating_Systems_Syllabus_Spring_2026.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default SyllabusDocument

