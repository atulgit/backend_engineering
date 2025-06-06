import { Registry, collectDefaultMetrics, Histogram } from 'prom-client';

export const register = new Registry();
collectDefaultMetrics({ register });

export const requestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

register.registerMetric(requestDuration);

export const setupMetrics = (app) => {
  app.use((req, res, next) => {
    const end = requestDuration.startTimer({ method: req.method, route: req.path });

    res.on('finish', () => {
      end({ status_code: res.statusCode });
    });

    next();
  });
};
