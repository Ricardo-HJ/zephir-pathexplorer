"use client"

import React from "react"

import { useState, type KeyboardEvent } from "react"
import { CustomButton } from "@/components/ui/button"
import { CustomInput } from "@/components/ui/input"
import { CustomTag } from "@/components/ui/tag"
import { CareerTopBackground } from "@/components/ui/backgrounds/index"
import { getIconByName } from "@/components/ui/icons"
import { Icon } from "lucide-react"

interface FormScreenProps {
  onNext: () => void
  onSkip: () => void
}

export default function FormScreen({ onNext, onSkip }: FormScreenProps) {
  // State for each input field
  const [priorityInput, setPriorityInput] = useState("")
  const [objectiveInput, setObjectiveInput] = useState("")
  const [interestInput, setInterestInput] = useState("")

  // State for lists of added items
  const [priorities, setPriorities] = useState<string[]>([])
  const [objectives, setObjectives] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])

  // Function to add a priority
  const addPriority = () => {
    if (priorityInput.trim() !== "" && !priorities.includes(priorityInput.trim())) {
      setPriorities([...priorities, priorityInput.trim()])
      setPriorityInput("")
    }
  }

  // Function to add an objective
  const addObjective = () => {
    if (objectiveInput.trim() !== "" && !objectives.includes(objectiveInput.trim())) {
      setObjectives([...objectives, objectiveInput.trim()])
      setObjectiveInput("")
    }
  }

  // Function to add an interest
  const addInterest = () => {
    if (interestInput.trim() !== "" && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()])
      setInterestInput("")
    }
  }

  // Handle key press (Enter) to add items
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, inputValue: string, addFunction: () => void) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault()
      addFunction()
    }
  }

  // Remove item from a list
  const removeItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(list.filter((i) => i !== item))
  }

  // Handle save and continue
  const handleSave = () => {
    // Here you would typically save the data to your state or API
    // For now, we'll just log it and move to the next step
    console.log({
      priorities,
      objectives,
      interests,
    })

    onNext()
  }

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden">
        {/* Background using SVG component */}
        <div className="absolute inset-0">
        <CareerTopBackground />
        </div>

        {/* Content overlay */}
        <div className="relative z-20 h-full w-full flex items-center justify-center">
            <div className="text-center px-4 w-full h-full">
              <div className="w-full pt-4 flex justify-end">
                <CustomButton
                  variant="white"
                  size="sm"
                  action={{ type: "function", handler: handleSave }}
                  disabled={priorities.length === 0 && objectives.length === 0 && interests.length === 0}
                  >
                  Guardar
                </CustomButton>
              </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div>
                        <h1 className="text-5xl font-bold text-center text-white mb-10">
                        Ingresa tu información
                        </h1>
                    </div>
                    
                    <div className="w-full max-w-6xl flex gap-12">
                        {/* Priorities Section */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              {getIconByName("icon-priority") && (
                                <div className="text-gray-600">
                                  {React.createElement(getIconByName("icon-priority"))}
                                </div>
                              )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Prioridades</h2>
                            <p className="text-gray-600">¿Qué aspectos son más importantes para ti en tu carrera profesional?</p>

                            <div className="flex gap-2">
                            <CustomInput
                                value={priorityInput}
                                onChange={(e) => setPriorityInput(e.target.value)}
                                placeholder="Añade una prioridad"
                                onKeyDown={(e) => handleKeyPress(e, priorityInput, addPriority)}
                                className="flex-1"
                            />
                            </div>

                            {priorities.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {priorities.map((priority, index) => (
                                <CustomTag
                                    key={index}
                                    variant="purple"
                                    removable
                                    onRemove={() => removeItem(priorities, setPriorities, priority)}
                                >
                                    {priority}
                                </CustomTag>
                                ))}
                            </div>
                            )}
                        </section>

                        {/* Objectives Section */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              {getIconByName("icon-target") && (
                                <div className="text-gray-600">
                                  {React.createElement(getIconByName("icon-target"))}
                                </div>
                              )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Objetivos</h2>
                            <p className="text-gray-600">¿Cuáles son tus metas profesionales a corto, mediano y largo plazo?</p>

                            <div className="flex gap-2">
                            <CustomInput
                                value={objectiveInput}
                                onChange={(e) => setObjectiveInput(e.target.value)}
                                placeholder="Añade un objetivo"
                                onKeyDown={(e) => handleKeyPress(e, objectiveInput, addObjective)}
                                className="flex-1"
                            />
                            </div>

                            {objectives.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {objectives.map((objective, index) => (
                                <CustomTag
                                    key={index}
                                    variant="purple"
                                    removable
                                    onRemove={() => removeItem(objectives, setObjectives, objective)}
                                >
                                    {objective}
                                </CustomTag>
                                ))}
                            </div>
                            )}
                        </section>

                        {/* Interests Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Intereses</h2>
                            <p className="text-gray-600">¿Qué áreas o tecnologías te interesan más en tu campo profesional?</p>

                            <div className="flex gap-2">
                            <CustomInput
                                value={interestInput}
                                onChange={(e) => setInterestInput(e.target.value)}
                                placeholder="Añade un interés"
                                onKeyDown={(e) => handleKeyPress(e, interestInput, addInterest)}
                                className="flex-1"
                            />
                            </div>

                            {interests.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {interests.map((interest, index) => (
                                <CustomTag
                                    key={index}
                                    variant="purple"
                                    removable
                                    onRemove={() => removeItem(interests, setInterests, interest)}
                                >
                                    {interest}
                                </CustomTag>
                                ))}
                            </div>
                            )}
                        </section>
                    </div>
                </div>

                <div className="p-6 flex justify-center space-x-4">

                </div>
            </div>
        </div>
    </div>
  )
}
