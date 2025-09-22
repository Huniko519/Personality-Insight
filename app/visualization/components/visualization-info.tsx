"use client"

import { memo } from "react"
import { Info, BarChart2 } from "lucide-react"

interface VisualizationInfoProps {
  selectedVisualization: string
  selectedType: string
  selectedEnneagramType: string
  enneagramTypes: Record<string, any>
  dimensionExplanations: any
  selectedDimension: string
}

const VisualizationInfo = memo(({
  selectedVisualization,
  selectedType,
  selectedEnneagramType,
  enneagramTypes,
  dimensionExplanations,
  selectedDimension,
}: VisualizationInfoProps) => {
  if (selectedVisualization === "type-wheel") {
    return (
      <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 flex items-start animate-fade-in">
        <Info className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-rose-700 dark:text-rose-300 text-sm">
          <strong>Tip:</strong> Click on any personality type in the wheel to view detailed information
          about that type. Hover over a type to highlight it.
        </p>
      </div>
    )
  }

  if (selectedVisualization === "cognitive-functions" && selectedType && selectedType !== "none") {
    return (
      <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
        <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg">
          About {selectedType} Cognitive Functions
        </h3>
        <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
          Each personality type has a unique pattern of cognitive functions that influences how they
          perceive the world and make decisions. The dominant function is the most developed and
          consciously used, while the inferior function is often less developed.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              Dominant & Auxiliary:
            </span>
            <span className="text-rose-600 dark:text-rose-400">
              These are your primary ways of interacting with the world. They're well-developed and you
              use them consciously.
            </span>
          </div>
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              Tertiary & Inferior:
            </span>
            <span className="text-rose-600 dark:text-rose-400">
              These functions are less developed and may emerge in times of stress or as areas for
              personal growth.
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (selectedVisualization === "dimension-spectrum") {
    return (
      <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
        <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg">
          Understanding {selectedDimension[0]} vs {selectedDimension[1]}
        </h3>
        <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
          {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations]?.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              {selectedDimension[0]}:
            </span>
            <span className="text-rose-600 dark:text-rose-400">
              {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations]?.left}
            </span>
          </div>
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              {selectedDimension[1]}:
            </span>
            <span className="text-rose-600 dark:text-rose-400">
              {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations]?.right}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (selectedVisualization === "enneagram-rings" && selectedEnneagramType && selectedEnneagramType !== "none") {
    const enneagramType = enneagramTypes[selectedEnneagramType]
    if (!enneagramType) return null

    return (
      <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
        <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg flex items-center">
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2">
            {selectedEnneagramType}
          </span>
          {enneagramType.name}
        </h3>

        <div className="mb-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100 mr-2">
            {enneagramType.center} Center
          </span>
          {enneagramType.keywords.map((keyword: string, index: number) => (
            <span
              key={index}
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-900 dark:text-rose-200 mr-2 mb-1"
            >
              {keyword}
            </span>
          ))}
        </div>

        <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
          {enneagramType.description}
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Wings:</span>
            {Object.entries(enneagramType.wings).map(
              ([wing, description]: [string, any]) => (
                <div key={wing} className="mb-2">
                  <span className="text-rose-600 dark:text-rose-400 font-medium">{description}</span>
                </div>
              ),
            )}
          </div>
          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              Growth & Stress:
            </span>
            <div className="mb-2">
              <span className="text-green-600 dark:text-green-400 font-medium">Growth Path: </span>
              <span className="text-rose-600 dark:text-rose-400">
                Type {enneagramType.growth} -{" "}
                {enneagramTypes[enneagramType.growth]?.name}
              </span>
            </div>
            <div>
              <span className="text-red-600 dark:text-red-400 font-medium">Stress Path: </span>
              <span className="text-rose-600 dark:text-rose-400">
                Type {enneagramType.stress} -{" "}
                {enneagramTypes[enneagramType.stress]?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/enneagram"
            className="text-rose-600 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-100 underline text-sm"
          >
            Learn more about Enneagram Type {selectedEnneagramType}
          </a>
        </div>
      </div>
    )
  }

  return null
})

VisualizationInfo.displayName = "VisualizationInfo"

export default VisualizationInfo
