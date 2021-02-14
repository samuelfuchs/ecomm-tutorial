const layout = require('../layout');

module.exports = ({ items }) => {
    const renderedItems = items.map((item) => {
        return `
            <div>${item.product.title} - ${item.product.price} - ${item.quantity}</div>
        `;
    }).join('');

    return layout({
        content: ` 
            <hi>Cart Items</h1>
            ${renderedItems}
        `
    })
}