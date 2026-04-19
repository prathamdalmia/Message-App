const colorPalette = ["red", "blue", "green", "purple", "orange"];

export function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colorPalette.length);
        return colorPalette[randomIndex];
}