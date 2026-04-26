"use client";

import { useEffect, useState } from "react";

export function formatCurrency(amount: number) {
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
