import { ReactNode } from 'react'

/**
* Core action interface for kbar commands
* @property id - Unique identifier for the action
* @property name - Display name of the action
* @property shortcut - Optional keyboard shortcut array
* @property keywords - Search keywords for the action
* @property perform - Function to execute when action is selected
* @property section - Optional section the action belongs to
* @property parent - Optional parent action for nested actions
*/
export interface Action {
id: string
name: string
shortcut?: string[]
keywords?: string
perform?: () => void
section?: Section
subtitle?: string
icon?: ReactNode
parent?: Action['id']
}

/**
* Section configuration for grouping actions
*/
export interface Section {
name: string
priority?: number
}

/**
* Result interface for search matches
*/
export interface Result {
id: string
score: number
action: Action
ancestors: Action[]
}

/**
* Animation configuration options
*/
export interface AnimationOptions {
enter: object
leave: object
duration?: number
ease?: string
}

/**
* Theme configuration
*/
export interface KBarTheme {
background: string
foreground: string
shadow: string
textColor: string
textColorSecondary: string
borderColor?: string
}

/**
* Props for the KBar provider component
*/
export interface KBarProviderProps {
actions?: Action[]
options?: KBarOptions 
theme?: Partial<KBarTheme>
children: ReactNode
}

/**
* Configuration options for KBar
*/
export interface KBarOptions {
animations?: Partial<AnimationOptions>
enableHistory?: boolean
disableScrollbarManagement?: boolean
callbacks?: {
    onOpen?: () => void
    onClose?: () => void
    onSelect?: (action: Action) => void
    onRegister?: (actions: Action[]) => void
}
}

/**
* Accessibility props for KBar components
*/
export interface A11yProps {
'aria-label'?: string
'aria-expanded'?: boolean
role?: string
tabIndex?: number
}

/**
* Type guard to check if an object is an Action
*/
export function isAction(obj: any): obj is Action {
return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj
}

/**
* Type guard to check if an object is a Result
*/
export function isResult(obj: any): obj is Result {
return obj && typeof obj === 'object' && 'score' in obj && 'action' in obj
}

/**
* Utility type for partial theme overrides
*/
export type ThemeOverrides = Partial<KBarTheme>

/**
* Union type for different animation states
*/
export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited'

/**
* Helper type for action registration
*/
export type RegisterActions = (actions: Action | Action[]) => void
