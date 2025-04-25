"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Download, Printer, Mail, CheckCircle } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllPersonalityTypes, getPersonalityExplanations } from "@/lib/firebase"

export default function ReportsPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string>("")
  const [personalityTypes, setPersonalityTypes] = useState<any>({})
  const [personalityExplanations, setPersonalityExplanations] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  // Update the sections state to include portrait section
  const [sections, setSections] = useState({
    overview: true,
    portrait: true,
    strengths: true,
    weaknesses: true,
    careers: true,
    relationships: true,
    growth: true,
    development: true,
    cognitive: true,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Fetch personality types and explanations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [types, explanations] = await Promise.all([getAllPersonalityTypes(), getPersonalityExplanations()])
        setPersonalityTypes(types)
        setPersonalityExplanations(explanations)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get personality type from localStorage if available
  useEffect(() => {
    const storedType = localStorage.getItem("personality_type")
    if (storedType) {
      setSelectedType(storedType)
    }
  }, [])

  const handleSectionToggle = (section: string) => {
    setSections({
      ...sections,
      [section]: !sections[section as keyof typeof sections],
    })
  }

  const handleGenerateReport = () => {
    if (!selectedType) return

    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById("printable-report")
    if (!reportElement) return

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 10

      pdf.addImage(imgData, "JPEG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`${selectedType}_Personality_Report.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating your PDF. Please try again.")
    }
  }

  const handleSendEmail = () => {
    if (!emailAddress) return

    setIsSendingEmail(true)

    // Simulate email sending
    setTimeout(() => {
      setIsSendingEmail(false)
      setEmailSent(true)

      // Reset email sent status after 5 seconds
      setTimeout(() => {
        setEmailSent(false)
        setEmailAddress("")
      }, 5000)
    }, 2000)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Report Generator</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Create a customized, printable report with detailed insights about your personality type
            </p>
          </div>

          {isLoading ? (
            <Card className="border-rose-200 shadow-md mb-8 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-8 w-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-rose-700">Loading personality types...</p>
            </Card>
          ) : !reportGenerated ? (
            <Card className="border-rose-200 shadow-md mb-8">
              <CardHeader>
                <CardTitle className="text-rose-800">Create Your Report</CardTitle>
                <CardDescription>Select your personality type and customize your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-rose-700 font-medium mb-2">Your Personality Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="border-rose-200">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(personalityTypes).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type} - {personalityTypes[type].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-rose-800 font-medium mb-3">Report Sections</h3>
                  {/* Update the sections checkboxes to include portrait section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="overview"
                        checked={sections.overview}
                        onCheckedChange={() => handleSectionToggle("overview")}
                      />
                      <Label htmlFor="overview" className="text-rose-700">
                        Type Overview
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="portrait"
                        checked={sections.portrait}
                        onCheckedChange={() => handleSectionToggle("portrait")}
                      />
                      <Label htmlFor="portrait" className="text-rose-700">
                        Personality Portrait
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="strengths"
                        checked={sections.strengths}
                        onCheckedChange={() => handleSectionToggle("strengths")}
                      />
                      <Label htmlFor="strengths" className="text-rose-700">
                        Strengths & Talents
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weaknesses"
                        checked={sections.weaknesses}
                        onCheckedChange={() => handleSectionToggle("weaknesses")}
                      />
                      <Label htmlFor="weaknesses" className="text-rose-700">
                        Potential Challenges
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="careers"
                        checked={sections.careers}
                        onCheckedChange={() => handleSectionToggle("careers")}
                      />
                      <Label htmlFor="careers" className="text-rose-700">
                        Career Recommendations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="relationships"
                        checked={sections.relationships}
                        onCheckedChange={() => handleSectionToggle("relationships")}
                      />
                      <Label htmlFor="relationships" className="text-rose-700">
                        Relationships & Compatibility
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="growth"
                        checked={sections.growth}
                        onCheckedChange={() => handleSectionToggle("growth")}
                      />
                      <Label htmlFor="growth" className="text-rose-700">
                        Personal Growth
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="development"
                        checked={sections.development}
                        onCheckedChange={() => handleSectionToggle("development")}
                      />
                      <Label htmlFor="development" className="text-rose-700">
                        Development Tips
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cognitive"
                        checked={sections.cognitive}
                        onCheckedChange={() => handleSectionToggle("cognitive")}
                      />
                      <Label htmlFor="cognitive" className="text-rose-700">
                        Cognitive Functions
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerateReport}
                  disabled={!selectedType || isGenerating}
                  className="bg-rose-600 hover:bg-rose-700 w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              {/* Report Actions */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-4 justify-center">
                <Button onClick={handlePrint} className="bg-rose-600 hover:bg-rose-700">
                  <Printer className="mr-2 h-5 w-5" />
                  Print Report
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-rose-600 hover:bg-rose-700">
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
                <div className="relative flex items-center">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-64 border-rose-200 pr-24"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <Button
                    onClick={handleSendEmail}
                    disabled={!emailAddress || isSendingEmail || emailSent}
                    className="absolute right-0 bg-rose-600 hover:bg-rose-700"
                  >
                    {isSendingEmail ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : emailSent ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    <span className="ml-2">{emailSent ? "Sent!" : "Email"}</span>
                  </Button>
                </div>
              </div>

              {/* Generated Report */}
              <div id="printable-report" className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="text-center mb-8 border-b border-rose-200 pb-6">
                  <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    PI
                  </div>
                  <h1 className="text-3xl font-bold text-rose-800 mb-2">PersonaIQ Report</h1>
                  <h2 className="text-2xl font-semibold text-rose-700 mb-1">
                    {selectedType} - {personalityTypes[selectedType]?.name}
                  </h2>
                  <p className="text-rose-600">{personalityTypes[selectedType]?.nickname}</p>
                  <p className="text-rose-500 text-sm mt-4">Generated on {new Date().toLocaleDateString()}</p>
                </div>

                {sections.overview && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Type Overview
                    </h3>
                    <p className="text-rose-700 mb-4">{personalityTypes[selectedType]?.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-rose-50 p-4 rounded-md">
                        <h4 className="font-semibold text-rose-800 mb-2">Core Traits</h4>
                        <ul className="list-disc list-inside text-rose-700 space-y-1">
                          {personalityTypes[selectedType]?.traits.map((trait, index) => (
                            <li key={index}>{trait}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-md">
                        <h4 className="font-semibold text-rose-800 mb-2">Values</h4>
                        <ul className="list-disc list-inside text-rose-700 space-y-1">
                          {personalityTypes[selectedType]?.values.map((value, index) => (
                            <li key={index}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {/* Add portrait section to the generated report */}
                {sections.portrait && personalityTypes[selectedType]?.portraitDescription && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Personality Portrait
                    </h3>

                    <div className="mb-6">
                      <p className="text-rose-700 mb-4">{personalityTypes[selectedType]?.portraitDescription}</p>
                    </div>

                    {personalityTypes[selectedType]?.poeticDescription && (
                      <div className="bg-rose-50 p-5 rounded-lg mb-6 italic text-rose-700 border-l-4 border-rose-300">
                        <p className="whitespace-pre-line">{personalityTypes[selectedType]?.poeticDescription}</p>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.detailedDescription && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-2">Detailed Description</h4>
                        <p className="text-rose-700 mb-4 whitespace-pre-line">
                          {personalityTypes[selectedType]?.detailedDescription}
                        </p>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.stressResponse && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-2">Response to Stress</h4>
                        <p className="text-rose-700 mb-4">{personalityTypes[selectedType]?.stressResponse}</p>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.naturalAbilities && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-2">Natural Abilities</h4>
                        <p className="text-rose-700 mb-4 whitespace-pre-line">
                          {personalityTypes[selectedType]?.naturalAbilities}
                        </p>
                      </div>
                    )}
                  </section>
                )}

                {sections.strengths && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Strengths & Talents
                    </h3>
                    <ul className="space-y-3">
                      {personalityTypes[selectedType]?.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-rose-500 mr-3 mt-1" />
                          <p className="text-rose-700">{strength}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {sections.weaknesses && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Potential Challenges
                    </h3>
                    <ul className="space-y-3">
                      {personalityTypes[selectedType]?.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 text-rose-500 mr-3 mt-1 flex-shrink-0">⚠️</div>
                          <p className="text-rose-700">{weakness}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Update careers section with more detailed information */}
                {sections.careers && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Career Recommendations
                    </h3>

                    {personalityTypes[selectedType]?.careerTraits && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-3">Career-Related Traits</h4>
                        <ul className="space-y-2">
                          {personalityTypes[selectedType]?.careerTraits.map((trait, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-check"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-rose-700">{trait}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.careerEnvironment && (
                      <div className="mb-6 bg-rose-50 p-5 rounded-lg">
                        <h4 className="font-semibold text-rose-800 mb-2">Ideal Work Environment</h4>
                        <p className="text-rose-700">{personalityTypes[selectedType]?.careerEnvironment}</p>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.careerStrengths && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-3">Career Strengths</h4>
                        <ul className="space-y-2">
                          {personalityTypes[selectedType]?.careerStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-check"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-rose-700">{strength}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.careerChallenges && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-3">Career Challenges</h4>
                        <ul className="space-y-2">
                          {personalityTypes[selectedType]?.careerChallenges.map((challenge, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-alert-triangle"
                                >
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-rose-700">{challenge}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-rose-700 mb-4">
                      Based on your personality type, these career paths may align well with your natural strengths and
                      preferences:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {personalityTypes[selectedType]?.careers.map((career, index) => (
                        <div key={index} className="bg-rose-50 p-3 rounded-md">
                          <p className="text-rose-700">{career}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 border border-rose-200 rounded-md">
                      <h4 className="font-semibold text-rose-800 mb-2">Why These Careers?</h4>
                      <p className="text-rose-700 text-sm">
                        These career recommendations are based on the typical strengths, values, and work preferences of
                        your personality type. However, remember that individual interests, skills, and experiences also
                        play a significant role in career satisfaction.
                      </p>
                    </div>
                  </section>
                )}

                {/* Update relationships section with more detailed information */}
                {sections.relationships && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Relationships & Compatibility
                    </h3>

                    <div className="mb-4">
                      <h4 className="font-semibold text-rose-800 mb-2">As Lovers and Partners</h4>
                      {personalityTypes[selectedType]?.relationships.loveQuote && (
                        <div className="bg-rose-50 p-4 rounded-lg mb-4 italic text-rose-700 border-l-4 border-rose-300">
                          <p>{personalityTypes[selectedType]?.relationships.loveQuote}</p>
                        </div>
                      )}
                      <p className="text-rose-700">{personalityTypes[selectedType]?.relationships.asPartners}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-rose-800 mb-2">As Friends</h4>
                      <p className="text-rose-700">{personalityTypes[selectedType]?.relationships.asFriends}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-rose-800 mb-2">Communication Style</h4>
                      <p className="text-rose-700">{personalityTypes[selectedType]?.relationships.communication}</p>
                    </div>

                    {personalityTypes[selectedType]?.asParents && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-rose-800 mb-2">As Parents</h4>
                        {personalityTypes[selectedType]?.relationships.parentQuote && (
                          <div className="bg-rose-50 p-4 rounded-lg mb-4 italic text-rose-700 border-l-4 border-rose-300">
                            <p>{personalityTypes[selectedType]?.relationships.parentQuote}</p>
                          </div>
                        )}
                        <p className="text-rose-700 whitespace-pre-line">{personalityTypes[selectedType]?.asParents}</p>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.relationshipStrengths && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-rose-800 mb-2">Relationship Strengths</h4>
                        <ul className="space-y-2">
                          {personalityTypes[selectedType]?.relationshipStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-check"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <p className="text-rose-700">{strength}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {personalityTypes[selectedType]?.relationshipWeaknesses && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-rose-800 mb-2">Relationship Challenges</h4>
                        <ul className="space-y-2">
                          {personalityTypes[selectedType]?.relationshipWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-alert-triangle"
                                >
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                              </div>
                              <p className="text-rose-700">{weakness}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-rose-50 p-4 rounded-md">
                        <h4 className="font-semibold text-rose-800 mb-2">Best Matches</h4>
                        <div className="flex flex-wrap gap-2">
                          {personalityTypes[selectedType]?.compatibility.best.map((type, index) => (
                            <div key={index} className="bg-rose-100 px-3 py-1 rounded-full text-rose-700">
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-md">
                        <h4 className="font-semibold text-rose-800 mb-2">Good Matches</h4>
                        <div className="flex flex-wrap gap-2">
                          {personalityTypes[selectedType]?.compatibility.good.map((type, index) => (
                            <div
                              key={index}
                              className="bg-white px-3 py-1 rounded-full text-rose-700 border border-rose-200"
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Add growth section */}
                {sections.growth && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Personal Growth
                    </h3>

                    {personalityTypes[selectedType]?.personalGrowth ? (
                      <div className="space-y-6">
                        {personalityTypes[selectedType]?.personalGrowth.meaningOfSuccess && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-rose-800 mb-2">What Success Means to {selectedType}</h4>
                            <p className="text-rose-700 mb-4 whitespace-pre-line">
                              {personalityTypes[selectedType]?.personalGrowth.meaningOfSuccess}
                            </p>
                          </div>
                        )}

                        {personalityTypes[selectedType]?.personalGrowth.strengths &&
                          personalityTypes[selectedType]?.personalGrowth.strengths.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-rose-800 mb-3">Growth Strengths</h4>
                              <ul className="space-y-2">
                                {personalityTypes[selectedType]?.personalGrowth.strengths.map((strength, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-rose-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-check"
                                      >
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-rose-700">{strength}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {personalityTypes[selectedType]?.personalGrowth.problemAreas &&
                          personalityTypes[selectedType]?.personalGrowth.problemAreas.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-rose-800 mb-3">Potential Problem Areas</h4>
                              <ul className="space-y-2">
                                {personalityTypes[selectedType]?.personalGrowth.problemAreas.map((problem, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-rose-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-alert-triangle"
                                      >
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-rose-700">{problem}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {personalityTypes[selectedType]?.personalGrowth.solutions &&
                          personalityTypes[selectedType]?.personalGrowth.solutions.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-rose-800 mb-3">Growth Opportunities</h4>
                              <ul className="space-y-2">
                                {personalityTypes[selectedType]?.personalGrowth.solutions.map((solution, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-rose-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-lightbulb"
                                      >
                                        <line x1="9" y1="18" x2="15" y2="18" />
                                        <line x1="10" y1="22" x2="14" y2="22" />
                                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-rose-700">{solution}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {personalityTypes[selectedType]?.personalGrowth.rulesForSuccess &&
                          personalityTypes[selectedType]?.personalGrowth.rulesForSuccess.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-rose-800 mb-3">Rules for Success</h4>
                              <ul className="space-y-2">
                                {personalityTypes[selectedType]?.personalGrowth.rulesForSuccess.map((rule, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="mr-3 mt-1 text-rose-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-rose-700">{rule}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="bg-rose-50 p-5 rounded-lg mb-6">
                        <p className="text-rose-700">
                          Growth information for {selectedType}s is currently being developed. Check back soon for
                          personalized growth strategies and development paths tailored to the {selectedType}{" "}
                          personality type.
                        </p>
                        <div className="mt-4">
                          <h4 className="font-semibold text-rose-800 mb-2">General Growth Tips for {selectedType}s:</h4>
                          <ul className="space-y-2 mt-3">
                            <li className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-lightbulb"
                                >
                                  <line x1="9" y1="18" x2="15" y2="18" />
                                  <line x1="10" y1="22" x2="14" y2="22" />
                                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                                </svg>
                              </div>
                              <p className="text-rose-700">
                                Recognize and leverage your natural strengths while being mindful of potential blind
                                spots.
                              </p>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-lightbulb"
                                >
                                  <line x1="9" y1="18" x2="15" y2="18" />
                                  <line x1="10" y1="22" x2="14" y2="22" />
                                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                                </svg>
                              </div>
                              <p className="text-rose-700">
                                Seek balance by developing your less dominant cognitive functions.
                              </p>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-lightbulb"
                                >
                                  <line x1="9" y1="18" x2="15" y2="18" />
                                  <line x1="10" y1="22" x2="14" y2="22" />
                                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                                </svg>
                              </div>
                              <p className="text-rose-700">
                                Practice self-awareness and reflection to better understand your patterns and triggers.
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {sections.development && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Development Tips
                    </h3>

                    <p className="text-rose-700 mb-4">
                      Understanding your personality type can help you identify areas for growth and development. Here
                      are some suggestions tailored to your type:
                    </p>

                    <div className="bg-rose-50 p-4 rounded-md mb-4">
                      <h4 className="font-semibold text-rose-800 mb-2">Growth Opportunities</h4>
                      <ul className="space-y-3 text-rose-700">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-rose-500 mr-3 mt-1" />
                          <div>
                            <p>
                              {selectedType.includes("E")
                                ? personalityExplanations.EI?.development.E
                                : personalityExplanations.EI?.development.I}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-rose-500 mr-3 mt-1" />
                          <div>
                            <p>
                              {selectedType.includes("S")
                                ? personalityExplanations.SN?.development.S
                                : personalityExplanations.SN?.development.N}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-rose-500 mr-3 mt-1" />
                          <div>
                            <p>
                              {selectedType.includes("T")
                                ? personalityExplanations.TF?.development.T
                                : personalityExplanations.TF?.development.F}
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-rose-500 mr-3 mt-1" />
                          <div>
                            <p>
                              {selectedType.includes("J")
                                ? personalityExplanations.JP?.development.J
                                : personalityExplanations.JP?.development.P}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <p className="text-rose-700">
                      Remember that personality type is not about limitations but about understanding your natural
                      preferences. With awareness and practice, you can develop skills in any area, even those that
                      don't come naturally to your type.
                    </p>
                  </section>
                )}

                {sections.cognitive && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4 border-b border-rose-100 pb-2">
                      Cognitive Functions
                    </h3>

                    <p className="text-rose-700 mb-4">
                      Your personality type uses eight cognitive functions in a specific order of preference. The top
                      four functions are the most conscious and influential in your personality:
                    </p>

                    <div className="space-y-4 mb-6">
                      {personalityTypes[selectedType]?.cognitiveFunctions.map((func, index) => (
                        <div key={index} className="bg-rose-50 p-4 rounded-md">
                          <div className="flex items-center mb-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                index < 2 ? "bg-rose-200 text-rose-800" : "bg-rose-100 text-rose-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <h4 className="font-semibold text-rose-800">{func.name}</h4>
                          </div>
                          <p className="text-rose-700">{func.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border border-rose-200 rounded-md">
                      <h4 className="font-semibold text-rose-800 mb-2">Understanding Cognitive Functions</h4>
                      <p className="text-rose-700 text-sm">
                        Cognitive functions are the mental processes we use to take in information and make decisions.
                        Your dominant and auxiliary functions are your strongest and most developed. Your tertiary and
                        inferior functions are less developed but still conscious. Understanding these functions can
                        provide deeper insights into how you process information and make decisions.
                      </p>
                    </div>
                  </section>
                )}

                <div className="text-center border-t border-rose-200 pt-6 mt-8">
                  <p className="text-rose-600 text-sm mb-2">This report was generated by PersonaIQ</p>
                  <p className="text-rose-500 text-xs">© {new Date().getFullYear()} PersonaIQ. All rights reserved.</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setReportGenerated(false)}
                  variant="outline"
                  className="border-rose-600 text-rose-600 hover:bg-rose-50"
                >
                  Create Another Report
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
