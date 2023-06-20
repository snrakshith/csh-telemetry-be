const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');


const tracerProvider = new NodeTracerProvider();

// Configure and add the Prometheus exporter
const prometheusExporter = new PrometheusExporter({
    endpointUrl: 'http://localhost:9090/metrics', // URL where Prometheus is running
});
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(prometheusExporter));

// Configure and add the Jaeger exporter
const jaegerExporter = new JaegerExporter({
    serviceName: 'your-service-name',
    // Additional Jaeger exporter configuration options if needed
});
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

// Register the tracer provider globally
tracerProvider.register();


// ##
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
