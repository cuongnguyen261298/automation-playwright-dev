interface XiaomiWatch {
  id: string;
  name: string;
  productLine: string;
  color: string;
  pricing: number;
  releaseDate: Date;
  status: boolean;
  description?: string;
}
export class LinearSearch {
  //0(n)
  constructor() {}

  async hasSpecialCharacter(str: string) {
    const specialCharRegex = /[^a-zA-Z0-9]/;
    return specialCharRegex.test(str);
  }

  async findSpecialChar(items: string | string[]) {
    if (items.length === 0) {
      console.log("Array is empty");
      return;
    }

    const arr = Array.isArray(items) ? items : [items];
    for (const item of arr) {
      if (await this.hasSpecialCharacter(item)) {
        console.log(item);
      }
    }
  }

  async hasRequiredKeys(watch: XiaomiWatch) {
    return (
      watch &&
      typeof watch.id === "string" &&
      typeof watch.name === "string" &&
      typeof watch.color === "string" &&
      typeof watch.pricing === "string"
    );
  }
  // Hàm Linear Search để kiểm tra và đếm status
  async analyzeObjects(arr: XiaomiWatch[]): Promise<{
    validObjects: number;
    trueCount: number;
    falseCount: number;
    invalidObjects: number[];
  }> {
    let trueCount = 0;
    let falseCount = 0;
    let validObjects = 0;
    const invalidObjects: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];

      if (await this.hasRequiredKeys(obj)) {
        validObjects++;
        if (obj.status === true) {
          trueCount++;
        } else {
          falseCount++;
        }
      } else {
        invalidObjects.push(i);
      }
    }

    return {
      validObjects,
      trueCount,
      falseCount,
      invalidObjects,
    };
  }
}
