export const Chains = {
    Bsc: "bsc",
    Merlin: "merlin",
} as const;

export type ChainId = typeof Chains[keyof typeof Chains];