# Guía de Configuración: Google Login para Supabase (TalkMe)

Para que el botón "Continuar con Google" funcione en TalkMe, repite los mismos pasos que para el ATS:

## Paso 1: Configurar Google Cloud Console

1.  Ve a [Google Cloud Console](https://console.cloud.google.com/).
2.  Puedes usar el mismo proyecto "Puentes Globales ATS" o crear uno nuevo.
3.  Si usas el mismo, ve a **Credenciales**.
    *   Haz clic en **Crear Credenciales** > **ID de cliente de OAuth**.
    *   Tipo de aplicación: **Aplicación web**.
    *   **Orígenes autorizados de JavaScript:**
        *   `http://localhost:5173` (Si TalkMe corre en el mismo puerto)
        *   `http://localhost:3000` (Si es distinto)
        *   Tu dominio de producción de TalkMe (ej: Vercel).
    *   **URI de redireccionamiento autorizados:**
        *   Ve a tu Dashboard de Supabase (Proyecto TalkMe) -> Authentication -> Providers -> Google -> **Callback URL**.
        *   Pégala aquí.
    *   Haz clic en **Crear**.

**¡Importante!** Obtén el **ID de Cliente** y el **Secreto de Cliente**.

## Paso 2: Configurar Supabase (TalkMe Project)

1.  Ve a tu [Dashboard de Supabase](https://supabase.com/dashboard) y selecciona el proyecto de TalkMe.
2.  Ve a **Authentication** > **Providers**.
3.  Habilita **Google**.
4.  Pega el **Client ID** y **Client Secret**.
5.  Haz clic en **Save**.

## Login de Super Admin

Una vez configurado, para activar tu Super Admin en TalkMe:
1.  Ve al Login.
2.  Regístrate o Inicia Sesión con: `visasytrabajos@gmail.com`.
3.  El sistema automáticamente te dará permisos de Admin y bypass de límites.
