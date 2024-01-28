
export const MapUtils = {
    getOrAdd<TKey, TValue>(map: Map<TKey, TValue>, key: TKey, defaultValue: TValue): TValue {
        if(map.has(key))
            return map.get(key)!;
        map.set(key, defaultValue);
        return defaultValue;
    }
}