import { LineTypeEnum } from "../models/lineType.enum";

export class CustomOddFormatter {
    static format(value: string, odd: string, format: LineTypeEnum) {
        if (format == LineTypeEnum.American) {
            if (value && odd) {
                return this.formatValue(value) + ' ' + this.formatValue(odd);
            } else if (value) {
                return this.formatValue(value);
            }
            return '-';
        } else {
            if (odd) {
                return this.formatOdd(odd);
            } else if (value) {
                return this.formatOdd(value);
            }
            return '-';
        }
    }

   private  static formatValue(spread) {
        const spreatInt = parseInt(spread);
        if (spreatInt > 0) {
            spread = '+' + spread;
        }
        return spread;
    }

    private static formatOdd(spread) {
        const spreatInt = parseInt(spread);
        if (spreatInt >= 0) {
            spread = (this.roundToTwo((spreatInt / 100)));
        } else {
            spread = (this.roundToTwo((-100 / spreatInt) + 1));
        }
        return spread;
    }

    private static roundToTwo(num) {
        return (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2);
    }

}