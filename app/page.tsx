'use client'

import { 
  Tractor, DollarSign, Users, BarChart3,
  ShoppingCart, Package, Wrench, Calculator, Wheat, UserPlus,
  MessageCircle, Send, Sun, Droplets, Wind, TrendingUp,
  Activity, MapPin, Fuel, Bell, X, ChevronLeft, ChevronRight,
  Search, HelpCircle, Settings
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function SinercIAVerticalMenu() {
  const [mensajes, setMensajes] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡Hola! 👋 Soy SinercIA, tu asistente IA especializado en caña y soja. Puedo ayudarte con consultas sobre tu operación agrícola. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [currentWidget, setCurrentWidget] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatTab, setChatTab] = useState('chat')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Debug log para verificar estado
  console.log('Current sidebarOpen state:', sidebarOpen);

  // Widgets del slider
  const widgets = [
    {
      id: 1,
      title: "Condiciones Actuales",
      icon: Sun,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">Temperatura</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">28°C</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Droplets className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">Humedad</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">65%</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Wind className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-gray-600">Viento</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">12 km/h</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Máquinas en Tiempo Real",
      icon: Tractor,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-600">John Deere 1</span>
            <p className="text-lg font-bold text-green-600">Operando</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Horas Hoy</span>
            <p className="text-lg font-bold text-gray-900">8.5h</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Combustible</span>
            <p className="text-lg font-bold text-orange-600">75%</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Resumen Financiero",
      icon: DollarSign,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-600">Ingresos Mes</span>
            <p className="text-lg font-bold text-green-600">$2.4M</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Gastos Mes</span>
            <p className="text-lg font-bold text-red-600">$1.1M</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Balance</span>
            <p className="text-lg font-bold text-blue-600">$1.3M</p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Estado de Lotes",
      icon: MapPin,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-600">Lote Norte</span>
            <p className="text-lg font-bold text-green-600">Cosechando</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Lote Sur</span>
            <p className="text-lg font-bold text-yellow-600">Madurando</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Lote Este</span>
            <p className="text-lg font-bold text-blue-600">En Prep.</p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Producción de Caña",
      icon: Wheat,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-600">TCH Promedio</span>
            <p className="text-lg font-bold text-green-600">85.2</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Toneladas Hoy</span>
            <p className="text-lg font-bold text-gray-900">145</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Meta Semanal</span>
            <p className="text-lg font-bold text-blue-600">78%</p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Stock de Insumos",
      icon: Package,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-600">Combustible</span>
            <p className="text-lg font-bold text-orange-600">2,400L</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Fertilizante</span>
            <p className="text-lg font-bold text-green-600">850kg</p>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">Repuestos</span>
            <p className="text-lg font-bold text-red-600">Bajo</p>
          </div>
        </div>
      )
    }
  ];

  // Menú lateral
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: BarChart3, route: '/dashboard', active: false },
    { id: 'ventas', title: 'Ventas', icon: ShoppingCart, route: '/ventas' },
    { id: 'compras', title: 'Compras', icon: Package, route: '/compras' },
    { id: 'stock', title: 'Stock', icon: Package, route: '/stock' },
    { id: 'maquinaria', title: 'Maquinaria', icon: Wrench, route: '/maquinaria' },
    { id: 'finanzas', title: 'Finanzas', icon: Calculator, route: '/finanzas' },
    { id: 'cosecha', title: 'Cosecha', icon: Wheat, route: '/cosecha' },
    { id: 'combustible', title: 'Combustible', icon: Fuel, route: '/combustible' },
    { id: 'campos', title: 'Campos', icon: MapPin, route: '/campos' },
    { id: 'servicios', title: 'Servicios', icon: UserPlus, route: '/servicios' }
  ];

  // Tarjetas principales expandibles (MEJORADAS con más subacciones)
  const mainActions = [
    {
      id: 'dashboard',
      title: "Dashboard",
      icon: BarChart3,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      subActions: [
        { name: "Ver reportes generales", route: "/dashboard/reportes" },
        { name: "Estado del sistema", route: "/dashboard/estado" },
        { name: "Métricas de rendimiento", route: "/dashboard/metricas" },
        { name: "Resumen ejecutivo", route: "/dashboard/resumen" }
      ]
    },
    {
      id: 'ventas',
      title: "Ventas", 
      icon: ShoppingCart,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      subActions: [
        { name: "Nueva factura", route: "/ventas/facturar" },
        { name: "Gestionar cobranzas", route: "/ventas/cobrar" },
        { name: "Reportes de ventas", route: "/ventas/reportes" },
        { name: "Clientes y cuentas", route: "/ventas/clientes" }
      ]
    },
    {
      id: 'compras',
      title: "Compras",
      icon: Package,
      color: "bg-orange-500", 
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      subActions: [
        { name: "Nueva orden de compra", route: "/compras/nueva" },
        { name: "Pagar facturas", route: "/compras/pagar" },
        { name: "Gestión de proveedores", route: "/compras/proveedores" },
        { name: "Reportes de compras", route: "/compras/reportes" }
      ]
    },
    {
      id: 'stock',
      title: "Stock",
      icon: Package,
      color: "bg-purple-500",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      subActions: [
        { name: "Ver inventario completo", route: "/stock/inventario" },
        { name: "Ajustar stock", route: "/stock/ajustar" },
        { name: "Movimientos de stock", route: "/stock/movimientos" },
        { name: "Alertas de stock mínimo", route: "/stock/alertas" }
      ]
    },
    {
      id: 'finanzas',
      title: "Finanzas",
      icon: Calculator,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      subActions: [
        { name: "Posición de cheques", route: "/finanzas/cheques" },
        { name: "Estado de caja", route: "/finanzas/caja" },
        { name: "Conciliación bancaria", route: "/finanzas/bancos" },
        { name: "Reportes financieros", route: "/finanzas/reportes" }
      ]
    },
    {
      id: 'cosecha',
      title: "Cosecha", 
      icon: Wheat,
      color: "bg-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      subActions: [
        { name: "Registrar remitos ingenio", route: "/cosecha/remitos" },
        { name: "Movimiento de máquinas", route: "/cosecha/maquinas" },
        { name: "Control de calidad", route: "/cosecha/calidad" },
        { name: "Reportes de producción", route: "/cosecha/produccion" }
      ]
    },
    {
      id: 'combustible',
      title: "Combustible",
      icon: Fuel,
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      subActions: [
        { name: "Registrar ingreso", route: "/combustible/ingreso" },
        { name: "Registrar egreso", route: "/combustible/egreso" },
        { name: "Control de consumo", route: "/combustible/consumo" },
        { name: "Proveedores de combustible", route: "/combustible/proveedores" }
      ]
    },
    {
      id: 'campos',
      title: "Campos",
      icon: MapPin,
      color: "bg-lime-600", 
      bgColor: "bg-lime-50",
      borderColor: "border-lime-200",
      subActions: [
        { name: "Campos en cosecha", route: "/campos/cosechando" },
        { name: "Estado de lotes", route: "/campos/estado" },
        { name: "Planificación de siembra", route: "/campos/siembra" },
        { name: "Análisis de rendimiento", route: "/campos/rendimiento" }
      ]
    }
  ];

  // Datos de búsqueda del sistema
  const searchData = [
    { type: 'Cliente', name: 'Juan Pérez', id: 'CLI001', category: 'clientes' },
    { type: 'Producto', name: 'Fertilizante NPK', id: 'PRD001', category: 'productos' },
    { type: 'Factura', name: 'FC-A-00001234', id: 'FAC001', category: 'facturas' },
    { type: 'Máquina', name: 'John Deere 1', id: 'MAQ001', category: 'maquinaria' },
    { type: 'Lote', name: 'Lote Norte - 25ha', id: 'LOT001', category: 'campos' },
    { type: 'Proveedor', name: 'Agroquímicos SA', id: 'PRV001', category: 'proveedores' }
  ];

  // Auto-slider de widgets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWidget((prev) => (prev + 1) % widgets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Cerrar menú en móvil cuando se redimensiona a desktop
  useEffect(() => {
    const handleResize = () => {
      // Solo cambiar el estado en móvil, no en desktop
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
      // En desktop dejamos que el usuario controle manualmente
    };

    window.addEventListener('resize', handleResize);
    
    // Inicialización: solo cerrar en móvil
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Función de búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = searchData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const enviarMensaje = async () => {
    if (!inputMessage.trim() || isLoading) return

    const mensajeUsuario: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMensajes(prev => [...prev, mensajeUsuario])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()

      const mensajeIA: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date()
      }

      setMensajes(prev => [...prev, mensajeIA])
    } catch (error) {
      console.error('Error sending message:', error)
      const mensajeError: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intentá de nuevo.',
        isUser: false,
        timestamp: new Date()
      }
      setMensajes(prev => [...prev, mensajeError])
    } finally {
      setIsLoading(false)
    }
  }

  const usarEjemplo = (ejemplo: string) => {
    setInputMessage(ejemplo)
  }

  const handleCardClick = (cardId) => {
    console.log(`Card clicked: ${cardId}, current expandedCard: ${expandedCard}`);
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleSubActionClick = (route) => {
    console.log(`Navegando a: ${route}`);
    setExpandedCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full overflow-x-hidden">
      {/* Header superior EXTENDIDO HASTA EL FINAL */}
      <header className="bg-white border-b border-gray-200 px-3 lg:px-6 py-2 lg:py-3 w-full fixed top-0 left-0 right-0 z-50 overflow-hidden">
        <div className="flex items-center justify-between w-full min-w-0">
          {/* Hamburguesa + Logo */}
          <div className="flex items-center gap-2">
            {/* Botón hamburguesa SOLO EN MÓVIL */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => {
                console.log('Abriendo menú hamburguesa');
                setSidebarOpen(true);
                setExpandedCard(null); // Cerrar panel expandido
              }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-5 h-0.5 bg-gray-600"></span>
              </div>
            </button>

            {/* Logo como botón de home */}
            <button 
              onClick={() => {
                console.log('Navegando a: /');
                setExpandedCard(null); // Cerrar panel expandido
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo-sinercia.png" 
                alt="SinercIA - Ir a inicio" 
                className="h-12 lg:h-16 w-28 lg:w-36 object-contain"
              />
            </button>
          </div>

          {/* Buscador centrado */}
          <div className="flex-1 max-w-[200px] lg:max-w-2xl mx-2 lg:mx-8 relative min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="w-full pl-10 pr-4 py-2 lg:py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-base"
              />
            </div>

            {/* Resultados de búsqueda */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] max-h-64 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      {searchResults.length} resultado(s) encontrado(s)
                    </div>
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          console.log(`Navegando a: ${result.category}/${result.id}`);
                          setShowSearchResults(false);
                          setSearchQuery('');
                          setExpandedCard(null); // Cerrar panel expandido
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{result.name}</div>
                            <div className="text-sm text-gray-500">{result.type} • {result.id}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No se encontraron resultados</p>
                    <p className="text-xs">Intenta con otro término</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Lado derecho: Acciones */}
          <div className="flex items-center space-x-1 lg:space-x-4 flex-shrink-0">
            <button 
              onClick={() => setExpandedCard(null)}
              className="hidden md:flex px-2 lg:px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Centro de ayuda</span>
            </button>

            <button 
              onClick={() => setExpandedCard(null)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <Bell className="w-4 lg:w-5 h-4 lg:h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 lg:w-5 h-4 lg:h-5 flex items-center justify-center text-[10px] lg:text-xs">
                7
              </span>
            </button>

            <button 
              onClick={() => setExpandedCard(null)}
              className="h-8 w-8 lg:h-10 lg:w-10 bg-slate-700 rounded-full flex items-center justify-center border-2 border-emerald-500 hover:bg-slate-600 transition-colors flex-shrink-0"
            >
              <Users className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor principal con padding top para el header fijo */}
      <div className="flex pt-[60px] lg:pt-[70px] w-full overflow-hidden">
        {/* Menú lateral FLOTANTE Y FIJO */}
        <div className={`hidden lg:block fixed z-40`} style={{
          top: '90px', 
          left: '30px', 
          bottom: '30px', 
          width: '320px'
        }}>
          <div className={`bg-slate-800 text-white rounded-xl shadow-2xl border border-gray-300 h-full flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-full' : 'w-16'}`}>
            {/* Header con botón toggle */}
            <div className="p-2 border-b border-slate-700 flex-shrink-0">
              <button
                onClick={() => {
                  console.log('Toggle clicked, current sidebarOpen:', sidebarOpen);
                  const newSidebarState = !sidebarOpen;
                  setSidebarOpen(newSidebarState);
                  
                  // Solo cerrar panel expandido si estamos ABRIENDO el menú lateral
                  if (newSidebarState === true && expandedCard) {
                    console.log('Cerrando panel expandido porque se abrió el menú lateral');
                    setExpandedCard(null);
                  }
                }}
                className="w-full flex items-center justify-center p-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Contenido principal - SIN OVERFLOW */}
            <div className="flex-1 flex flex-col justify-between min-h-0">
              <div className="p-2 flex-shrink-0">
                {/* Menú de navegación TAMAÑO OPTIMIZADO */}
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.id} className="relative group">
                        <button
                          onClick={() => {
                            if (!sidebarOpen) {
                              console.log('Abriendo menú lateral desde botón, cerrando panel expandido si existe');
                              setSidebarOpen(true);
                              // Cerrar panel expandido cuando se abre el menú desde un botón
                              if (expandedCard) {
                                setExpandedCard(null);
                              }
                            } else {
                              console.log(`Navegando a: ${item.route}`);
                              // No cerrar panel expandido cuando se navega, solo cuando se abre el menú
                            }
                          }}
                          className="w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left text-slate-300 hover:bg-slate-700 hover:text-white text-sm"
                        >
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                          {sidebarOpen && <span className="ml-3 text-sm">{item.title}</span>}
                        </button>
                        
                        {/* Tooltip para menú colapsado */}
                        {!sidebarOpen && (
                          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">
                            {item.title}
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Footer fijo con configuración */}
              <div className="p-2 border-t border-slate-700 flex-shrink-0">
                <div className="relative group">
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) {
                        console.log('Abriendo menú lateral desde configuración, cerrando panel expandido si existe');
                        setSidebarOpen(true);
                        // Cerrar panel expandido cuando se abre el menú desde configuración
                        if (expandedCard) {
                          setExpandedCard(null);
                        }
                      } else {
                        console.log('Navegando a: /configuracion');
                        // No cerrar panel expandido cuando se navega a configuración
                      }
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span className="ml-3 text-sm">Configuración</span>}
                  </button>
                  
                  {/* Tooltip para configuración cuando está colapsado */}
                  {!sidebarOpen && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[60]">
                      Configuración
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menú lateral para móvil - COMPLETAMENTE SIN NEGRO */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="fixed inset-0 bg-transparent" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed top-0 left-0 h-full w-64 bg-slate-800 text-white shadow-2xl transform transition-transform duration-300 ease-out">
              <div className="p-4 pt-20">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          console.log(`Navegando a: ${item.route}`);
                          setSidebarOpen(false);
                          setExpandedCard(null);
                        }}
                        className="w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="ml-3">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-8 pt-8 border-t border-slate-700">
                  <button 
                    onClick={() => {
                      console.log('Navegando a: /configuracion');
                      setSidebarOpen(false);
                      setExpandedCard(null);
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3">Configuración</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la página */}
        <div className="flex-1 flex flex-col">
          {/* Contenido principal */}
          <main className={`flex-1 p-3 lg:p-4 overflow-hidden transition-all duration-300 ${
            expandedCard 
              ? `lg:mr-[750px] ${sidebarOpen ? 'lg:ml-[380px]' : 'lg:ml-[110px]'}` 
              : `lg:mr-[380px] ${sidebarOpen ? 'lg:ml-[380px]' : 'lg:ml-[110px]'}`
          }`}>
            <div className="max-w-full mx-auto space-y-4 overflow-hidden">
              {/* Slider de Widgets */}
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <h2 className="text-lg font-semibold text-gray-900">Tiempo Real</h2>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => setCurrentWidget((prev) => (prev - 1 + widgets.length) % widgets.length)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentWidget((prev) => (prev + 1) % widgets.length)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 lg:p-5 shadow-sm border border-gray-200 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    {(() => {
                      const IconComponent = widgets[currentWidget].icon;
                      return <IconComponent className="w-6 h-6 text-orange-500 flex-shrink-0" />;
                    })()}
                    <h3 className="font-semibold text-gray-900 flex-1 min-w-0">{widgets[currentWidget].title}</h3>
                    <div className="flex gap-1 flex-shrink-0">
                      {widgets.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentWidget ? 'bg-orange-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    {widgets[currentWidget].content}
                  </div>
                </div>
              </div>

              {/* Tarjetas de Acceso Rápido - CON CONTORNOS MEJORADOS */}
              <div className="w-full">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full overflow-hidden">
                  {mainActions.map((action) => {
                    const IconComponent = action.icon;
                    const isExpanded = expandedCard === action.id;
                    
                    console.log(`Rendering card: ${action.id}, isExpanded: ${isExpanded}`);
                    
                    return (
                      <div
                        key={action.id}
                        className={`
                          relative p-4 lg:p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer min-w-0 w-full
                          ${isExpanded ? 
                            `${action.borderColor} ${action.bgColor} shadow-xl ring-4 ring-offset-2 ring-opacity-50 ${action.color.replace('bg-', 'ring-')} transform scale-105` : 
                            'border-gray-200 bg-white hover:shadow-lg hover:border-gray-300 hover:transform hover:scale-[1.02]'
                          }
                        `}
                        onClick={() => {
                          console.log(`Clicking on card: ${action.id}`);
                          handleCardClick(action.id);
                        }}
                      >
                        <div className="flex flex-col items-center text-center space-y-2 w-full">
                          <div className={`p-3 lg:p-3 rounded-xl ${action.color} flex-shrink-0 transition-transform ${isExpanded ? 'scale-110' : ''}`}>
                            <IconComponent className="w-6 h-6 lg:w-6 lg:h-6 text-white" />
                          </div>
                          
                          <div className="w-full min-w-0">
                            <h3 className={`font-semibold text-sm lg:text-sm truncate transition-colors ${isExpanded ? 'text-gray-800' : 'text-gray-900'}`}>
                              {action.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* CHAT FIJO PARA DESKTOP */}
      <div className="hidden lg:block fixed z-30"
           style={{
             top: '90px', 
             right: '30px', 
             bottom: '30px', 
             width: '320px'
           }}>
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-2xl border border-gray-300 h-full flex flex-col overflow-hidden">
          
          {/* Header del Chat */}
          <div className="p-4 border-b border-slate-600">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">SinercIA</h3>
                <p className="text-xs text-slate-300">El Google de tu Empresa</p>
              </div>
            </div>
          </div>

          {/* Tabs del chat */}
          <div className="border-b border-slate-600">
            <div className="flex">
              <button
                onClick={() => setChatTab('chat')}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                  chatTab === 'chat' 
                    ? 'bg-slate-600 text-white border-b-2 border-emerald-500' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => setChatTab('preguntas')}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                  chatTab === 'preguntas' 
                    ? 'bg-slate-600 text-white border-b-2 border-emerald-500' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                <span className="text-lg">💡</span>
                Preguntas
              </button>
            </div>
          </div>

          {/* Contenido de los tabs */}
          <div className="flex-1 overflow-hidden">
            {chatTab === 'chat' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`flex items-start gap-3 ${mensaje.isUser ? 'flex-row-reverse' : ''}`}
                    >
                      {!mensaje.isUser && (
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          IA
                        </div>
                      )}
                      <div className={`p-3 rounded-lg max-w-xs shadow-sm ${
                        mensaje.isUser
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-600 text-white'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{mensaje.text}</p>
                        <p className="text-xs opacity-75 mt-2">
                          {mensaje.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        IA
                      </div>
                      <div className="bg-slate-600 text-white p-3 rounded-lg max-w-xs shadow-sm">
                        <p className="text-sm">SinercIA está escribiendo...</p>
                      </div>
                    </div>
                  )}

                  {mensajes.length <= 1 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-xs text-slate-300 font-medium">Ejemplos rápidos:</p>
                      
                      <button 
                        onClick={() => usarEjemplo("¿Cuántos lotes tengo en total?")}
                        className="w-full text-left p-2 bg-slate-600 hover:bg-slate-500 rounded text-xs text-white transition-colors"
                      >
                        "¿Cuántos lotes tengo en total?"
                      </button>
                      
                      <button 
                        onClick={() => usarEjemplo("¿Qué máquinas están disponibles?")}
                        className="w-full text-left p-2 bg-slate-600 hover:bg-slate-500 rounded text-xs text-white transition-colors"
                      >
                        "¿Qué máquinas están disponibles?"
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-slate-600">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          enviarMensaje();
                        }
                      }}
                      placeholder="Pregúntame sobre tu operación..."
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    />
                    <button 
                      onClick={enviarMensaje}
                      disabled={isLoading || !inputMessage.trim()}
                      className="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-600">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    Preguntas Inteligentes
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">Toca una pregunta para usarla</p>
                </div>
                
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {[
                    "¿Cuántos lotes tengo en total?",
                    "¿Qué máquinas están disponibles?",
                    "Mostrame el inventario de productos",
                    "¿Cuál es la superficie total de mis lotes?",
                    "¿Cuál es el TCH promedio de mis cultivos de caña?",
                    "¿Cuántas toneladas cosechamos esta semana?",
                    "¿Qué máquinas están trabajando ahora?",
                    "¿Cuánto combustible necesito para mañana?",
                    "¿Cuáles son mis mejores lotes por rendimiento?",
                    "¿Cuándo vencen mis próximos cheques?",
                    "¿Cómo está el precio de la caña hoy?",
                    "¿Cuál es mi margen de ganancia este mes?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        setChatTab('chat');
                      }}
                      className="w-full text-left p-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm text-white transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel lateral expandible - DESKTOP */}
      {expandedCard && (
        <div className="hidden lg:block fixed bg-white shadow-2xl border border-gray-200 z-50 rounded-xl overflow-hidden transform transition-transform duration-500 ease-out"
             style={{
               top: '90px', 
               right: '380px',
               bottom: '30px', 
               width: '350px'
             }}>
          {(() => {
            console.log(`Rendering expanded card for: ${expandedCard}`);
            const currentAction = mainActions.find(action => action.id === expandedCard);
            console.log('Found action:', currentAction);
            if (!currentAction) return null;
            
            const IconComponent = currentAction.icon;
            
            return (
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${currentAction.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentAction.title}</h3>
                      <p className="text-sm text-gray-500">Selecciona una acción</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedCard(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto">
                  {currentAction.subActions.map((subAction, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubActionClick(subAction.route)}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${currentAction.borderColor} ${currentAction.bgColor}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{subAction.name}</h4>
                          <p className="text-sm text-gray-600">Toca para acceder</p>
                        </div>
                        <div className={`p-2 rounded-lg ${currentAction.color} group-hover:scale-110 transition-transform`}>
                          <ChevronRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Panel lateral expandible - MÓVIL MEJORADO - MÁS SEPARADO DEL CHAT */}
      {expandedCard && (
        <div className="lg:hidden fixed inset-0 z-[75] flex items-end pb-32">
          {/* Overlay completamente transparente */}
          <div 
            className="absolute inset-0 bg-transparent"
            onClick={() => setExpandedCard(null)}
          ></div>
          
          {/* Panel que sube desde abajo */}
          <div className="relative bg-white w-full rounded-t-3xl max-h-[45vh] overflow-hidden shadow-2xl border-t border-gray-200">
            {(() => {
              const currentAction = mainActions.find(action => action.id === expandedCard);
              if (!currentAction) return null;
              
              const IconComponent = currentAction.icon;
              
              return (
                <div className="flex flex-col h-full">
                  {/* Header del panel */}
                  <div className="p-4 border-b border-gray-200 bg-white rounded-t-3xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${currentAction.color}`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{currentAction.title}</h3>
                          <p className="text-xs text-gray-500">Selecciona una acción</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setExpandedCard(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Contenido scrolleable */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                    {currentAction.subActions.map((subAction, index) => (
                      <button
                        key={index}
                        onClick={() => handleSubActionClick(subAction.route)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg group ${currentAction.borderColor} ${currentAction.bgColor}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-gray-900 mb-1">{subAction.name}</h4>
                            <p className="text-xs text-gray-600">Toca para acceder</p>
                          </div>
                          <div className={`p-2 rounded-lg ${currentAction.color} group-hover:scale-110 transition-transform`}>
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Chat flotante para móvil */}
      <div className="lg:hidden">
        {!chatOpen && (
          <div className="fixed bottom-6 right-6 z-[60]">
            <button
              onClick={() => setChatOpen(true)}
              className="w-16 h-16 bg-purple-600 text-white rounded-full shadow-xl hover:bg-purple-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-7 h-7" />
            </button>
          </div>
        )}

        {chatOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 z-[65]"
              onClick={() => setChatOpen(false)}
            ></div>
            
            <div className="fixed inset-4 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-[70]">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-t-xl flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold text-white text-base">SinercIA - El Google de tu Empresa</h3>
                    <p className="text-purple-100 text-sm">Especialista en tu Establecimiento La Ramada</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)}>
                  <X className="w-5 h-5 text-white hover:text-purple-200" />
                </button>
              </div>

              <div className="border-b border-gray-200 bg-white">
                <div className="flex">
                  <button
                    onClick={() => setChatTab('chat')}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                      chatTab === 'chat' 
                        ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </button>
                  <button
                    onClick={() => setChatTab('preguntas')}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                      chatTab === 'preguntas' 
                        ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">💡</span>
                    Preguntas
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                {chatTab === 'chat' ? (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                      {mensajes.map((mensaje) => (
                        <div
                          key={mensaje.id}
                          className={`flex items-start gap-3 ${mensaje.isUser ? 'flex-row-reverse' : ''}`}
                        >
                          {!mensaje.isUser && (
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              IA
                            </div>
                          )}
                          <div className={`p-4 rounded-lg max-w-xs shadow-sm ${
                            mensaje.isUser
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{mensaje.text}</p>
                            <p className="text-xs opacity-75 mt-2">
                              {mensaje.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            IA
                          </div>
                          <div className="bg-white text-gray-800 border border-gray-200 p-4 rounded-lg max-w-xs shadow-sm">
                            <p className="text-sm">SinercIA está escribiendo...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              enviarMensaje();
                            }
                          }}
                          placeholder="Pregúntame sobre TCH, lotes, máquinas..."
                          disabled={isLoading}
                          className="flex-1 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                        />
                        <button 
                          onClick={enviarMensaje}
                          disabled={isLoading || !inputMessage.trim()}
                          className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full bg-gray-50">
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        Preguntas Inteligentes
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">Toca una pregunta para usarla en el chat</p>
                    </div>
                    
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                      {[
                        "¿Cuántos lotes tengo en total?",
                        "¿Qué máquinas están disponibles?",
                        "Mostrame el inventario de productos",
                        "¿Cuál es la superficie total de mis lotes?",
                        "¿Cuál es el TCH promedio de mis cultivos de caña?",
                        "¿Cuántas toneladas cosechamos esta semana?",
                        "¿Qué máquinas están trabajando ahora?",
                        "¿Cuánto combustible necesito para mañana?",
                        "¿Cuáles son mis mejores lotes por rendimiento?",
                        "¿Cuándo vencen mis próximos cheques?",
                        "¿Cómo está el precio de la caña hoy?",
                        "¿Cuál es mi margen de ganancia este mes?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputMessage(question);
                            setChatTab('chat');
                          }}
                          className="w-full text-left p-4 bg-white rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-colors text-sm shadow-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Overlay para cerrar resultados de búsqueda */}
      {showSearchResults && (
        <div 
          className="fixed inset-0 z-[55]"
          onClick={() => setShowSearchResults(false)}
        ></div>
      )}
    </div>
  )
}