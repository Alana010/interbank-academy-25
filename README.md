## Introducción
Esta herramienta es útil para analizar transacciones de manera rápida desde la terminal y mostrar reportes financieros

---

## Instrucciones de Ejecución

### 1. Clonar el repositorio

https://github.com/Alana010/interbank-academy-25.git
cd interbank-academy-25.git

### 2. Instalar dependecias

npm install

### 4. ejecutar 

node app.js <ruta_al_archivo_csv>
node app.js data.csv

## Enfoque y Solución

Lectura de CSV mediante fs.createReadStream para manejar archivos grandes eficientemente.

Uso de la librería csv-parser para transformar filas en objetos JavaScript.

Lógica de acumulación para balance, conteo e identificación del monto más alto.

Validaciones básicas: existencia del archivo, errores de lectura y datos mal formateados.


## Estructura del Proyecto

interbank-academy-25/
│
├── app.js                   # Código principal de la aplicación
├── data.csv                 # Archivo de prueba 
├── package.json             # Configuración y dependencias
