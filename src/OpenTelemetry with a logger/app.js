const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ConsoleSpanExporter } = require('@opentelemetry/tracing');
const { LogLevel } = require('@opentelemetry/api');


// Set up the tracer provider and exporter
const tracerProvider = new NodeTracerProvider();

// Configure and add the ConsoleSpanExporter
const exporter = new ConsoleSpanExporter({
    logger: console,
    level: LogLevel.ERROR, // Adjust the log level as per your requirement
});

// Add the exporter to the tracer provider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register the tracer provider globally
tracerProvider.register();

// ###

// Instrument your Node.js app code with OpenTelemetry

const { trace } = require('@opentelemetry/api');

// Create a tracer
const tracer = trace.getTracer('your-instrumentation-name');

// Instrument your code with spans
const span = tracer.startSpan('your-operation-name');
// Add attributes or events to the span if needed
// span.addEvent('your-event-name');

// Log a message with trace information
const log = {
    level: LogLevel.INFO,
    message: 'Your log message',
    spanContext: trace.getSpanContext(span),
};

// Pass the log to your logger implementation
yourLogger.log(log);

// Perform your app logic here...

// End the span when the operation is complete
span.end();
