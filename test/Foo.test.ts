const foo = {
    str: "string",
    int: 1,
    bool: true
};

type FooType = {
    str: string,
    int: number,
    bool: boolean;
}


var json = JSON.stringify(foo);
console.log(json);

const parsed = JSON.parse(json);
console.log(parsed);

const casted = <FooType>parsed;

console.log(casted);

const assign = Object.assign(casted, parsed);
console.log(SVGForeignObjectElement.prototype);