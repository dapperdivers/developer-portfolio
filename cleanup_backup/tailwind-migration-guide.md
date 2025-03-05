# Bootstrap to Tailwind Migration Guide

## Reactstrap Component Replacements

### Container
```jsx
<div className="container mx-auto px-4">
```

### Row
```jsx
<div className="flex flex-wrap -mx-4">
```

### Col
```jsx
<div className="w-full px-4 md:w-1/2"> (for Col md="6")
```

### Button
```jsx
<button className="px-4 py-2 bg-primary text-white rounded">
```

### Card
```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden">
```

### CardBody
```jsx
<div className="p-4">
```

### CardHeader
```jsx
<div className="px-4 py-3 border-b">
```

### CardFooter
```jsx
<div className="px-4 py-3 border-t">
```

### Navbar
```jsx
<nav className="bg-white shadow">
```

### NavbarBrand
```jsx
<div className="font-semibold text-xl">
```

## Bootstrap Class Mappings

| Bootstrap Class | Tailwind Equivalent |
|----------------|---------------------|
| `container` | `container mx-auto px-4` |
| `row` | `flex flex-wrap -mx-4` |
| `col` | `flex-1 px-4` |
| `col-md-6` | `w-full px-4 md:w-1/2` |
| `col-lg-4` | `w-full px-4 lg:w-1/3` |
| `d-flex` | `flex` |
| `d-none` | `hidden` |
| `d-block` | `block` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `align-items-center` | `items-center` |
| `flex-column` | `flex-col` |
| `mt-0` | `mt-0` |
| `mt-1` | `mt-1` |
| `mt-2` | `mt-2` |
| `mt-3` | `mt-3` |
| `mt-4` | `mt-4` |
| `mt-5` | `mt-5` |
| `text-center` | `text-center` |
| `text-left` | `text-left` |
| `text-right` | `text-right` |
| `text-white` | `text-white` |
| `bg-primary` | `bg-primary` |
| `bg-secondary` | `bg-secondary` |
| `btn` | `px-4 py-2 inline-flex justify-center items-center rounded` |
| `btn-primary` | `bg-primary text-white` |
| `btn-secondary` | `bg-secondary text-white` |
| `card` | `bg-white rounded-lg shadow-md overflow-hidden` |
| `section` | `py-12` |

## Migration Steps

1. Replace reactstrap component imports with native HTML elements
2. Replace Bootstrap classes with their Tailwind equivalents
3. Use Tailwind's `@apply` directive in CSS files to maintain consistent styling
4. Test thoroughly after each component migration
