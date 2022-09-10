let Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Texture = PIXI.Texture,
    loader = PIXI.loader,
    resources = PIXI.resources,
    utils = PIXI.utils;

let type = "WebGL"
if (!utils.isWebGLSupported()) {
    type = "canvas"
}
utils.sayHello(type)