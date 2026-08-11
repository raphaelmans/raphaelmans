"use client";

import { useSyncExternalStore } from "react";
import { Check, Monitor, Moon, Sun, SunMoon } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

const themeOptions = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeMenu() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { theme, setTheme } = useTheme();
  const selectedTheme = mounted ? theme : undefined;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Change color theme"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <SunMoon className="size-[18px]" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={12}
          className="z-[60] min-w-40 rounded-lg border border-border bg-popover p-1 text-popover-foreground outline-none"
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Color theme
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={selectedTheme} onValueChange={setTheme}>
            {themeOptions.map(({ value, label, Icon }) => (
              <DropdownMenu.RadioItem
                key={value}
                value={value}
                className="relative flex min-h-11 cursor-default select-none items-center gap-2 rounded-md px-2 py-2 pr-8 text-sm text-secondary-foreground outline-none data-[highlighted]:bg-secondary data-[highlighted]:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{label}</span>
                <DropdownMenu.ItemIndicator className="absolute right-2 inline-flex items-center" aria-hidden="true">
                  <Check className="size-4" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
