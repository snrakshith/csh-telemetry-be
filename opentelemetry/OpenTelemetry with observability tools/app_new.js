const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');


const tracerProvider = new NodeTracerProvider();

// Configure and add the Jaeger exporter
const jaegerExporter = new JaegerExporter({
    serviceName: 'your-service-name',
    // Additional Jaeger exporter configuration options if needed
});

// Configure and add the Prometheus exporter
const prometheusExporter = new PrometheusExporter({
    startServer: true,
    port: 9464, // Specify the port for Prometheus to scrape
});

// Add the exporters to the tracer provider
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(prometheusExporter));

// Register the tracer provider globally
tracerProvider.register();


// ###

const { trace } = require('@opentelemetry/api');

// Create a tracer
const tracer = trace.getTracer('your-instrumentation-name');

// Instrument your code with spans
const span = tracer.startSpan('your-operation-name');
// Add attributes or events to the span if needed
// span.addEvent('your-event-name');

// Perform your app logic here...

// End the span when the operation is complete
span.end();
