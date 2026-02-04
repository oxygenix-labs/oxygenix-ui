import styles from './Badge.module.css'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'stable' | 'beta' | 'new' | 'deprecated' | 'experimental'
}

export function Badge({ children, variant = 'stable' }: BadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[variant]}`}>
            {children}
        </span>
    )
}
