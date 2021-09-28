import { LineTypeEnum } from "../models/lineType.enum";

export class CustomOddFormatter {

    static formatHandicap(value: string, odd: string, format: LineTypeEnum, addSign: boolean) {
        if (format == LineTypeEnum.American) {
            if(parseInt(value) == 0) {
                return 'PK' + this.formatValue(odd, true);
            } else if (value && odd) {
                return this.formatValue(value, addSign) + '' + this.formatValue(odd, true);
            } else if (value) {
                return this.formatValue(value, addSign);
            }
            return '-';
        } else {
            if (value && odd) {
                return this.formatValue(value, addSign) + ' ' + this.formatOdd(odd);;
            } else if (value) {
                return this.formatOdd(odd);
            }
            return '-';
        }
    }

    static format(value: string, odd: string, format: LineTypeEnum, addSign: boolean) {
        if (format == LineTypeEnum.American) {
            if (value && odd) {
                return this.formatValue(value, addSign) + '' + this.formatValue(odd, true);
            } else if (value) {
                return this.formatValue(value, addSign);
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

   private  static formatValue(spread, addSign: boolean) {
        const spreatInt = parseInt(spread);
        if (spreatInt > 0 && addSign) {
            spread = '+' + spread;
        }
        return  '' +  spread;
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