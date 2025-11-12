# Fashion Store - Clothing E-Commerce Website

A simple, modern, and responsive website for selling clothes with shopping cart functionality.

## Features

- 🛍️ **Product Catalog**: Browse through 22 clothing items with image support
- 🛒 **Shopping Cart**: Add items to cart, update quantities, and remove items
- 💰 **Price Calculation**: Automatic total calculation
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 💾 **Local Storage**: Cart persists even after page refresh
- 🎨 **Modern UI**: Beautiful, clean interface with smooth animations

## Getting Started

### Installation

1. Clone or download this repository
2. Open the `index.html` file in your web browser
3. That's it! No build process or dependencies required.

### Usage

1. **Browse Products**: Scroll through the product grid to see available items
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header to open the cart sidebar
4. **Manage Cart**: 
   - Use +/- buttons to adjust quantities
   - Click "Remove" to remove items
   - View the total price at the bottom
5. **Checkout**: Click "Checkout" to complete your purchase (demo mode)

## File Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
├── images/         # Product images folder
│   ├── product1.jpg through product22.jpg
│   └── README.md   # Image setup instructions
└── README.md       # This file
```

## Customization

### Adding Products

Edit the `products` array in `script.js` to add, remove, or modify products:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 29.99,
        image: "images/product1.jpg",  // Image path
        description: "Product description"
    },
    // Add more products...
];
```

**Important:** When adding new products, make sure to:
1. Add the corresponding image file to the `images` folder
2. Use a unique ID for each product
3. Update the image path to match your image filename

### Styling

Modify `styles.css` to change colors, fonts, or layout. Key CSS variables are defined at the top:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
    /* ... */
}
```

### Images

The website is configured to load product images from the `images` folder. 

**Setup Instructions:**

1. Add product images to the `images` folder
2. Name them according to the pattern: `product1.jpg`, `product2.jpg`, etc. (up to `product22.jpg`)
3. Recommended image size: 800x800 pixels (square format)
4. Supported formats: JPG, PNG, or WebP
5. If an image is missing, the site will attempt to load `placeholder.jpg` as a fallback

**Current Products (22 total):**
- Product 1-12: Original products (T-Shirts, Jackets, Jeans, Shoes, Dresses, etc.)
- Product 13-22: Additional products (Polo Shirts, Skinny Jeans, Bomber Jackets, High Heels, Tank Tops, Blazers, Leggings, Beanies, Cardigans, Sandals)

See `images/README.md` for detailed image requirements and tips.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Product search and filtering
- Product categories
- Product detail pages
- User authentication
- Payment integration
- Order history
- Product reviews
- Wishlist functionality

## License

This project is open source and available for personal and commercial use.

## Contact

For questions or suggestions, please open an issue or contact the development team.

