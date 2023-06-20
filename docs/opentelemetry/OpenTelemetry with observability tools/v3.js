const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Create a tracer provider
const tracerProvider = new NodeTracerProvider();

// Configure Jaeger exporter
const jaegerExporter = new JaegerExporter({
    serviceName: 'your-service-name',
    host: 'your-jaeger-host',
    port: 6832, // Your Jaeger port
});

// Configure Prometheus exporter
const prometheusExporter = new PrometheusExporter({
    endpoint: 'your-prometheus-metrics-endpoint',
});

// Create a span processor and add exporters
const spanProcessor = new SimpleSpanProcessor(jaegerExporter);
tracerProvider.addSpanProcessor(spanProcessor);
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
tracerProvider.register();

// Export Prometheus metrics
prometheusExporter.startServer();

// Log when a span is started and ended
const api = require('@opentelemetry/api');
api.trace.setGlobalTracerProvider(tracerProvider);

// Configure Express middleware to create spans
app.use((req, res, next) => {
    const span = api.trace.getTracer('express-tracer').startSpan(req.path);
    req.context = api.trace.setSpan(api.context.active(), span);
    next();
});

// Close the exporter and flush any remaining spans
process.on('SIGTERM', async () => {
    await tracerProvider.shutdown();
    process.exit(0);
});
