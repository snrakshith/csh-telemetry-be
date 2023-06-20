const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// Register Express instrumentation
registerInstrumentations({
    instrumentations: [
        new ExpressInstrumentation(),
        // Add any other instrumentations you need here
    ],
});
