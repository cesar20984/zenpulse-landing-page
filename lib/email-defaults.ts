export const DEFAULT_TEMPLATES = [
    {
        slug: "purchase-confirmation",
        name: "Confirmación de Compra",
        subject: "¡Gracias por tu compra en ZenPulse! (Orden #{{order_number}})",
        body: `Hola {{customer_name}},

¡Muchas gracias por confiar en ZenPulse! Hemos recibido tu pago correctamente y estamos preparando tu pedido.

Detalles de tu orden:
Número de orden: {{order_number}}
Producto: {{product_name}}
Dirección de entrega: {{shipping_address}}, {{comuna}}

Te avisaremos apenas tu pedido esté en camino. Si tienes alguna duda, responde a este correo o contáctanos por nuestro sitio.

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number", "product_name", "shipping_address", "comuna"],
    },
    {
        slug: "order-shipped",
        name: "Pedido en Camino",
        subject: "Tu ZenPulse está en camino 🚚 (Orden #{{order_number}})",
        body: `Hola {{customer_name}},

¡Buenas noticias! Tu pedido #{{order_number}} ya ha sido despachado y va en camino a tu dirección: {{shipping_address}}, {{comuna}}.

Recuerda que nuestras entregas en Santiago son de lunes a viernes. Si compraste antes de las 12:00, deberías recibirlo hoy mismo. Si fue después, llegará mañana hábil.

¡Que lo disfrutes mucho!

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number", "shipping_address", "comuna"],
    },
    {
        slug: "order-delivered",
        name: "Pedido Entregado",
        subject: "¡Tu ZenPulse ha sido entregado! ✨",
        body: `Hola {{customer_name}},

Tu pedido #{{order_number}} ha sido entregado exitosamente.

Esperamos que ZenPulse te ayude a tener un descanso profundo y reparador. Si tienes un momento, nos encantaría saber qué te parece el producto.

Cualquier duda con el uso, recuerda que tienes el manual y nuestro contacto en el sitio.

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number"],
    },
    {
        slug: "order-cancelled",
        name: "Pedido Cancelado",
        subject: "Información sobre la cancelación de tu pedido #{{order_number}}",
        body: `Hola {{customer_name}},

Te informamos que tu pedido #{{order_number}} ha sido cancelado.

Si esto fue producto de una devolución aprobada, el proceso de reembolso ha sido iniciado según nuestras políticas (5-10 días hábiles).

Si tienes dudas sobre esta cancelación, por favor contáctanos.

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number"],
    },
    {
        slug: "payment-failed",
        name: "Pago Rechazado",
        subject: "Problema con el pago de tu orden #{{order_number}}",
        body: `Hola {{customer_name}},

Lamentamos informarte que el pago de tu pedido #{{order_number}} no pudo ser procesado por Mercado Pago.

Aún tenemos tus detalles de envío guardados por si quieres intentar nuevamente con otro medio de pago aquí: {{checkout_url}}

Si necesitas ayuda técnica, no dudes en escribirnos.

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number", "checkout_url"],
    },
    {
        slug: "admin-new-order",
        name: "Nueva Venta (Admin)",
        subject: "💰 ¡Nueva Venta! Orden #{{order_number}}",
        body: `¡Hola!

Se ha recibido una nueva compra por un ZenPulse.

Detalles:
Cliente: {{customer_name}}
Monto: {{amount}}
Comuna: {{comuna}}
Dirección: {{shipping_address}}

Revisa el panel de administración para gestionar el envío: {{admin_url}}`,
        placeholders: ["customer_name", "order_number", "amount", "comuna", "shipping_address", "admin_url"],
    },
    {
        slug: "abandoned-cart",
        name: "Carrito Abandonado",
        subject: "¿Olvidaste algo? Tu ZenPulse te espera",
        body: `Hola {{customer_name}},

Vimos que estabas interesado en mejorar tu descanso con ZenPulse pero no completaste la compra.

Queremos recordarte que los envíos en Santiago son gratuitos y entregamos hoy mismo si completas tu pedido antes de las 12:00.

Puedes terminar tu compra aquí: {{checkout_url}}

¡Te deseamos un buen descanso!

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "checkout_url"],
    },
    {
        slug: "manual-email",
        name: "Correo Manual (Básico)",
        subject: "Información sobre tu pedido ZenPulse",
        body: `Hola {{customer_name}},

Te escribimos en relación a tu pedido #{{order_number}}.

{{message}}

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "order_number", "message"],
    },
    {
        slug: "admin-low-stock",
        name: "Stock Crítico (Admin)",
        subject: "⚠️ ¡ALERTA! Solo queda 1 unidad de {{product_name}}",
        body: `¡Atención!

El inventario de {{product_name}} ha llegado a solo 1 unidad. 

Recomendación: Pausa la publicidad inmediatamente para evitar vender más unidades de las disponibles.

Revisa el inventario aquí: {{admin_url}}`,
        placeholders: ["product_name", "admin_url"],
    },
    {
        slug: "send-discount",
        name: "Enviar Descuento",
        subject: "🎁 Un descuento especial para tu descanso",
        body: `Hola {{customer_name}},

Vimos tu interés en ZenPulse. Queremos ayudarte a mejorar tu descanso, así que te hemos activado un descuento especial y exclusivo.

Tu descuento ya está aplicado en el siguiente enlace:
{{checkout_url_discount}}

Recuerda que con esto sigues obteniendo Envío Gratis y entrega rápida.
¡No dejes pasar esta oportunidad de regalarte bienestar!

Saludos,
El equipo de ZenPulse`,
        placeholders: ["customer_name", "checkout_url_discount"],
    },
];
