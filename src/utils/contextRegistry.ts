/**
 * Context Registry
 * 
 * A simple registry to track all contexts in the application.
 * This is useful for debugging, testing, and understanding context relationships.
 */

// Registry to store all context instances
interface ContextEntry {
  name: string;
  description?: string;
  defaultValue: any;
}

class ContextRegistry {
  private static instance: ContextRegistry;
  private registry: Map<string, ContextEntry> = new Map();
  
  private constructor() {
    // Singleton pattern - private constructor
  }
  
  public static getInstance(): ContextRegistry {
    if (!ContextRegistry.instance) {
      ContextRegistry.instance = new ContextRegistry();
    }
    return ContextRegistry.instance;
  }
  
  /**
   * Register a new context
   * @param name - The name of the context
   * @param defaultValue - The default value of the context
   * @param description - Optional description of the context's purpose
   */
  public register(name: string, defaultValue: any, description?: string): void {
    if (this.registry.has(name)) {
      console.warn(`Context "${name}" is already registered. This might cause conflicts.`);
    }
    
    this.registry.set(name, { name, defaultValue, description });
    
    if (import.meta.env.DEV) {
      console.log(`Context registered: ${name}${description ? ` - ${description}` : ''}`);
    }
  }
  
  /**
   * Check if a context is registered
   * @param name - The name of the context to check
   * @returns True if the context is registered
   */
  public hasContext(name: string): boolean {
    return this.registry.has(name);
  }
  
  /**
   * Get all registered contexts
   * @returns Array of context entries
   */
  public getAllContexts(): ContextEntry[] {
    return Array.from(this.registry.values());
  }
  
  /**
   * Get a specific context entry
   * @param name - The name of the context to get
   * @returns The context entry or undefined if not found
   */
  public getContext(name: string): ContextEntry | undefined {
    return this.registry.get(name);
  }
  
  /**
   * Clear the registry (useful for testing)
   */
  public clear(): void {
    this.registry.clear();
  }
}

// Export singleton instance
export const contextRegistry = ContextRegistry.getInstance();

export default contextRegistry;
