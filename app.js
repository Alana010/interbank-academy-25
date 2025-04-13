const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Procesa un archivo CSV y genera un reporte de transacciones.
 * @param {string} filePath Ruta del archivo CSV
 */
function processCSV(filePath) {
    let balance = 0;
    let maxTransaction = { id: null, amount: 0 };
    let transactionCount = { 'Crédito': 0, 'Débito': 0 };

    // Verifica si el archivo existe antes de leerlo
    if (!fs.existsSync(filePath)) {
        console.error('Error: Archivo no encontrado');
        process.exit(1);
    }

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                const id = row.id?.trim();
                const type = row.tipo?.trim();
                const amount = parseFloat(row.monto);

                if (!id || !type || isNaN(amount)) {
                    throw new Error('Fila inválida en el CSV.');
                }

                if (type === 'Crédito') {
                    balance += amount;
                    transactionCount['Crédito']++;
                } else if (type === 'Débito') {
                    balance -= amount;
                    transactionCount['Débito']++;
                }

                if (amount > maxTransaction.amount) {
                    maxTransaction = { id, amount };
                }
            } catch (error) {
                console.warn(`Advertencia: ${error.message}`);
            }
        })
        .on('end', () => {
            console.log('\n Reporte de Transacciones');
            console.log('---------------------------------------------');
            console.log(`Balance Final: ${balance.toFixed(2)}`);
            console.log(`Transacción de Mayor Monto: ID ${maxTransaction.id} - ${maxTransaction.amount.toFixed(2)}`);
            console.log(`Conteo de Transacciones: Crédito: ${transactionCount['Crédito']} | Débito: ${transactionCount['Débito']}\n`);
        })
        .on('error', (err) => {
            console.error('Error al leer el archivo:', err.message);
        });
}

// Obtener la ruta del archivo CSV desde los argumentos
const filePath = process.argv[2];

if (!filePath) {
    console.error('Uso: node app.js <ruta_del_archivo_csv>');
    process.exit(1);
}

processCSV(path.resolve(filePath));
