import type { TxnValue } from "@/models/curr_pairs/txns/TxnValue";

export class TxnValueMatcher<T extends TxnValue> {
    private readonly dates: number[];
    private readonly range: T[];

    constructor(range: T[]) {
        this.range = range.sort((a, b) => a.ts.getTime() - b.ts.getTime());
        this.dates = this.range.map(txnValue => txnValue.ts.getTime());
    }

    public match(txnValue: T) {
        const index = this.binarySearch(this.dates, txnValue.ts.getTime());
        return index < 0 ? undefined : this.range[index];
    }

    //TODO: change to strategy type
    private binarySearch(arr: number[], target: number): number {
        let left: number = 0;
        let right: number = arr.length - 1;
    
        while (left <= right) {
          const mid: number = Math.floor((left + right) / 2);
      
          if (Math.abs(arr[mid] - target) <= 4000) {
            return mid;
          } else if (arr[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
      
        return -1;
    }
}