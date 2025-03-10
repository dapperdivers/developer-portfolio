export interface SecurityHeaders {
  contentSecurityPolicy?: {
    directives: {
      [key: string]: string[];
    };
  };
  crossOriginEmbedderPolicy?: boolean;
  crossOriginOpenerPolicy?: boolean;
  crossOriginResourcePolicy?: boolean;
  xssFilter?: boolean;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export interface SecurityPluginOptions {
  isProd?: boolean;
  headers?: SecurityHeaders;
  rateLimit?: RateLimitConfig;
}