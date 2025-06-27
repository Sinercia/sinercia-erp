import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { PrismaClient } from '@prisma/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const prisma = new PrismaClient()

async function obtenerContextoEmpresa() {
  try {
    console.log('🔍 Iniciando búsqueda de empresa...')
    console.log('🔗 DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...')

    const empresa = await prisma.empresa.findFirst({
      include: {
        lotes: { include: { cultivos: { include: { cosechas: true } } } },
        maquinas: { include: { trabajos: true } },
        productos: true,
        cheques: true
      }
    })

    if (!empresa) {
      console.log('❌ No se encontró empresa')
      return "No hay datos de empresa disponibles."
    }

    // Conteo de lotes con .count()
    const totalLotes = await prisma.lote.count()
    console.log('📦 Total de lotes:', totalLotes)

    // Toneladas totales
    const totalCosechas = empresa.lotes.reduce((sumLote, lote) => {
      return sumLote + lote.cultivos.reduce((sumCult, cultivo) => {
        return sumCult + cultivo.cosechas.reduce((acc, c) => acc + c.toneladas, 0)
      }, 0)
    }, 0)

    // TCH promedio
    const totalCantos = empresa.lotes.reduce((cnt, lote) =>
      cnt + lote.cultivos.flatMap(c => c.cosechas).length
    , 0)
    const tchPromedio = totalCantos > 0
      ? empresa.lotes
          .flatMap(l => l.cultivos)
          .flatMap(c => c.cosechas)
          .reduce((acc, c) => acc + (c.tch || 0), 0) / totalCantos
      : 0

    return `
INFORMACIÓN DE LA EMPRESA:
- Nombre: ${empresa.nombre}
- CUIT: ${empresa.cuit}
- Ubicación: ${empresa.direccion}

RESUMEN PRODUCTIVO:
- Total lotes: ${empresa.lotes.length}
- Producción total: ${totalCosechas.toFixed(0)} t
- TCH promedio: ${tchPromedio.toFixed(1)}

...`  // aquí continúa tu template
  } catch (error) {
    console.error('Error contexto:', error)
    return "Error al obtener datos de la empresa."
  }
}

export async function POST(request: NextRequest) {
  const { message } = await request.json()
  if (!message) {
    return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 })
  }

  const contexto = await obtenerContextoEmpresa()
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `Eres SinercIA... \n\n${contexto}` },
      { role: "user",   content: message }
    ],
    max_tokens: 500,
    temperature: 0.7,
  })

  const respuesta = completion.choices[0]?.message?.content || "Error procesando consulta."
  return NextResponse.json({ message: respuesta, timestamp: new Date().toISOString() })
}

process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
