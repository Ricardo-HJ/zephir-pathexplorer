import { CustomButton } from "@/components/ui/button"

interface InformationScreenProps {
  onNext: () => void
  onSkip: () => void
}

export default function InformationScreen({ onNext, onSkip }: InformationScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-center text-accenture-purple mb-10">Ingresa tu información</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Intereses section */}
          <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-accenture-purple">
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Intereses</h2>
            <p className="text-gray-600 text-center">
              Comparte tus intereses profesionales y personales para ayudarnos a entender tus metas.
            </p>
          </div>

          {/* Habilidades section */}
          <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-accenture-purple">
                <use href="/sprite.svg#icon-education" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Habilidades</h2>
            <p className="text-gray-600 text-center">
              Indica tus habilidades técnicas y blandas para ayudarnos a encontrar oportunidades adecuadas.
            </p>
          </div>

          {/* Certificaciones section */}
          <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-accenture-purple">
                <use href="/sprite.svg#icon-charts" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Certificaciones</h2>
            <p className="text-gray-600 text-center">
              Agrega tus certificaciones para destacar tus logros y conocimientos especializados.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-center space-x-4">
        <CustomButton variant="white" size="md" action={{ type: "function", handler: onSkip }}>
          Omitir
        </CustomButton>
        <CustomButton variant="purple" size="md" action={{ type: "function", handler: onNext }}>
          Continuar
        </CustomButton>
      </div>
    </div>
  )
}
