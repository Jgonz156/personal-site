"use client"

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer"
import {
  personalInfo,
  professionalSummary,
  education,
  experience,
  teachingInterests,
  courseDevelopment,
  achievements,
  independentStudies,
  previousExperience,
  technicalSkills,
} from "@/lib/resume-data"

// Professional resume styles
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
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  title: {
    fontSize: 12,
    color: "#2563eb",
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 9,
    color: "#666666",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 9,
    color: "#444444",
    lineHeight: 1.5,
  },
  entryContainer: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    flexWrap: "wrap",
  },
  entryTitleContainer: {
    flex: 1,
    marginRight: 10,
    minWidth: 200,
  },
  entryTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
  },
  entryDate: {
    fontSize: 8,
    color: "#666666",
    flexShrink: 0,
    textAlign: "right",
  },
  entrySubtitle: {
    fontSize: 9,
    color: "#2563eb",
    marginBottom: 2,
  },
  entryLocation: {
    fontSize: 8,
    color: "#666666",
    marginBottom: 3,
  },
  entryDescription: {
    fontSize: 8,
    color: "#444444",
    fontStyle: "italic",
  },
  bulletList: {
    marginTop: 3,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 8,
    color: "#2563eb",
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: "#444444",
    lineHeight: 1.4,
  },
  descriptionText: {
    fontSize: 8,
    color: "#444444",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  outcomeText: {
    fontSize: 8,
    color: "#2563eb",
    lineHeight: 1.4,
    fontStyle: "italic",
  },
  skillsContainer: {
    marginBottom: 6,
  },
  skillCategory: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  skillsList: {
    fontSize: 8,
    color: "#444444",
    lineHeight: 1.4,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  interestTag: {
    fontSize: 8,
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    padding: "3 8",
    borderRadius: 3,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
})

// Resume Document Component
const ResumeDocument = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>
        <Text style={styles.contactInfo}>
          {personalInfo.institution} • {personalInfo.location} •{" "}
          {personalInfo.email}
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summaryText}>{professionalSummary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
              </View>
              <Text style={styles.entryDate}>{edu.year}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{edu.institution}</Text>
            <Text style={styles.entryLocation}>{edu.location}</Text>
            <Text style={styles.descriptionText}>{edu.focus}</Text>
            {edu.thesis && (
              <Text style={styles.entryDescription}>
                Thesis Area: {edu.thesis}
              </Text>
            )}
          </View>
        ))}
      </View>

      {/* Professional Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {experience.map((exp, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{exp.title}</Text>
              </View>
              <Text style={styles.entryDate}>{exp.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{exp.institution}</Text>
            <Text style={styles.entryLocation}>{exp.location}</Text>
            <View style={styles.bulletList}>
              {exp.responsibilities.map((resp, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{resp}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements & Competitions</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{achievement.title}</Text>
              </View>
              <Text style={styles.entryDate}>{achievement.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{achievement.organization}</Text>
            <Text style={styles.descriptionText}>{achievement.description}</Text>
          </View>
        ))}
      </View>

      {/* Independent Study Mentorship */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Research & Mentorship</Text>
        {independentStudies.map((study, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{study.title}</Text>
              </View>
              <Text style={styles.entryDate}>{study.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{study.student}</Text>
            <Text style={styles.descriptionText}>{study.description}</Text>
            {study.outcome && (
              <Text style={styles.outcomeText}>→ {study.outcome}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Previous Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Experience</Text>
        {previousExperience.map((exp, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{exp.role}</Text>
              </View>
              <Text style={styles.entryDate}>{exp.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{exp.organization}</Text>
            <Text style={styles.descriptionText}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Technical Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {Object.entries(technicalSkills).map(([category, skills]) => (
          <View key={category} style={styles.skillsContainer}>
            <Text style={styles.skillCategory}>{category}</Text>
            <Text style={styles.skillsList}>{skills.join(" • ")}</Text>
          </View>
        ))}
      </View>

      {/* Teaching Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teaching & Research Interests</Text>
        <Text style={styles.skillsList}>{teachingInterests.join(" • ")}</Text>
      </View>
    </Page>
  </Document>
)

// Function to generate and download the PDF
export async function downloadResumePdf() {
  const blob = await pdf(<ResumeDocument />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default ResumeDocument
