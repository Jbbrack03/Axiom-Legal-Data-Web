"use client"

import { useState } from "react"
import { Database, Cpu, Lock, CheckCircle, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InteractiveQualityStandard() {
  const [activeTab, setActiveTab] = useState("data-sources")

  const tabs = [
    {
      id: "data-sources",
      icon: Database,
      label: "Data Sources",
      title: "Multi-Modal Data Sources",
      description: "EDGAR filings, RECAP court documents, and curated legal repositories",
      details: [
        "SEC 10-K/10-Q filings with comprehensive financial disclosures",
        "Federal court dockets from PACER and RECAP archives", 
        "Public legal databases with verified document authenticity",
        "Real-time document ingestion with automated quality checks"
      ]
    },
    {
      id: "vlm",
      icon: Cpu, 
      label: "VLM Architecture",
      title: "Vision Language Models",
      description: "Document understanding beyond simple OCR with contextual comprehension",
      details: [
        "Document structure recognition preserving legal hierarchy",
        "Complex formatting and annotation processing",
        "Multi-page relationship mapping for connected documents", 
        "Semantic meaning extraction across diverse document types"
      ]
    },
    {
      id: "pii",
      icon: Lock,
      label: "PII Detection",
      title: "Dual-Model PII Detection",
      description: "Advanced Named Entity Recognition with privacy-first pseudonymization",
      details: [
        "99.9% PII detection accuracy with dual-validation pipeline",
        "GDPR/CCPA compliant processing with audit trails",
        "Configurable anonymization rules for different jurisdictions",
        "Legal privilege protection with attorney-client safeguards"
      ]
    },
    {
      id: "qa",
      icon: CheckCircle,
      label: "QA Pipeline", 
      title: "Quality Assurance Pipeline",
      description: "Multi-stage validation ensuring production-ready output quality",
      details: [
        "TSTR methodology validation with statistical significance",
        "LegalBench task benchmarking across 162 reasoning challenges",
        "Statistical distribution analysis ensuring data fidelity",
        "Human expert review cycles with domain-specific validation"
      ]
    },
    {
      id: "portfolio",
      icon: Briefcase,
      label: "Dataset Portfolio",
      title: "Specialized Dataset Portfolio", 
      description: "Purpose-built datasets for specific legal AI applications",
      details: [
        "Litigation Response Library: Motion responses and procedural filings (In Development)",
        "Contract Clause Generator: Commercial agreements and standardized language (In Development)",
        "Legal Brief Corpus: Appellate briefs and legal argumentation (In Development)",
        "Regulatory Compliance Suite: Industry-specific legal requirements (In Development)"
      ]
    }
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0]
  const IconComponent = activeTabData.icon

  return (
    <section className="py-32 bg-background/30">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Axiom Quality Standard
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Behind our simple .jsonl output files lies a sophisticated pipeline engineered for uncompromising quality and legal compliance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/50 text-foreground hover:bg-primary/10 border border-primary/10"
                  }`}
                >
                  <TabIcon className="w-4 h-4" strokeWidth={2} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-background/50 rounded-2xl p-8 border border-primary/10">
            <div className="flex items-start space-x-6 mb-8">
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20 flex-shrink-0">
                <IconComponent className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{activeTabData.title}</h3>
                <p className="text-lg text-foreground leading-relaxed">{activeTabData.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {activeTabData.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3 bg-background/30 rounded-lg p-4">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" strokeWidth={2} />
                  <span className="text-foreground leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 text-primary hover:bg-primary/10"
            >
              Request Technical Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}