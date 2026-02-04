import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ArrowRight, Zap, Shield, Gauge, Github } from 'lucide-react'
import styles from './page.module.css'

export default function Home() {
    return (
        <>
            <Header />

            {/* Hero Section - Two Column Layout */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    {/* Left Column - Editorial */}
                    <div className={styles.heroLeft}>
                        <Link href="/blog/oxygenix-ui-3.0" className={styles.announcement}>
                            Read about Oxygenix UI 3.0 →
                        </Link>

                        <h1 className={styles.heroTitle}>
                            Build complex apps
                            <br />
                            with confidence
                        </h1>

                        <p className={styles.heroSubtext}>
                            An open-source component library optimized for fast development,
                            easy maintenance, and accessibility. Just import and go—no
                            configuration required.
                        </p>

                        <div className={styles.heroCode}>
                            <pre><code>{`import "@oxygenix-ui/themes/styles.css";
import { Theme, Button } from "@oxygenix-ui/themes";

export default () => (
  <Theme>
    <Button>Let's go</Button>
  </Theme>
);`}</code></pre>
                        </div>

                        <div className={styles.heroCtas}>
                            <Link href="/docs/getting-started/installation" className={styles.ctaPrimary}>
                                Get started
                                <ArrowRight size={16} />
                            </Link>
                            <Link href="/playground" className={styles.ctaSecondary}>
                                Playground
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Product UI Mockups */}
                    <div className={styles.heroRight}>
                        <div className={styles.mockupGrid}>
                            {/* Team Management Card */}
                            <div className={`${styles.mockup} ${styles.mockup1}`}>
                                <div className={styles.mockupHeader}>
                                    <span className={styles.mockupTitle}>Your team</span>
                                </div>
                                <p className={styles.mockupSubtext}>Invite and manage your team members.</p>
                                <div className={styles.mockupContent}>
                                    <div className={styles.teamMember}>
                                        <div className={styles.avatar} style={{ background: '#ec4899' }}>EJ</div>
                                        <div className={styles.memberInfo}>
                                            <div className={styles.memberName}>Emeline Jabre</div>
                                            <div className={styles.memberEmail}>emeline.jabre@example.com</div>
                                        </div>
                                        <span className={styles.roleBadge}>Admin</span>
                                    </div>
                                    <div className={styles.teamMember}>
                                        <div className={styles.avatar} style={{ background: '#3b82f6' }}>ZW</div>
                                        <div className={styles.memberInfo}>
                                            <div className={styles.memberName}>Zac Wight</div>
                                            <div className={styles.memberEmail}>zac.wight@example.com</div>
                                        </div>
                                        <span className={styles.roleBadge}>Member</span>
                                    </div>
                                    <div className={styles.teamMember}>
                                        <div className={styles.avatar} style={{ background: '#8b5cf6' }}>PN</div>
                                        <div className={styles.memberInfo}>
                                            <div className={styles.memberName}>Poppy Nichols</div>
                                            <div className={styles.memberEmail}>poppy.nichols@example.com</div>
                                        </div>
                                        <span className={styles.roleBadge}>Member</span>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Card */}
                            <div className={`${styles.mockup} ${styles.mockup2}`}>
                                <div className={styles.mockupHeader}>
                                    <span className={styles.mockupTitle}>Notifications</span>
                                </div>
                                <p className={styles.mockupSubtext}>Manage your notification settings.</p>
                                <div className={styles.mockupContent}>
                                    <div className={styles.notificationRow}>
                                        <div>
                                            <div className={styles.notifTitle}>Comments</div>
                                            <div className={styles.notifDesc}>Receive notifications when someone comments</div>
                                        </div>
                                        <div className={styles.toggle}>
                                            <div className={`${styles.toggleTrack} ${styles.toggleOn}`}>
                                                <div className={styles.toggleThumb}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.notificationRow}>
                                        <div>
                                            <div className={styles.notifTitle}>Favorites</div>
                                            <div className={styles.notifDesc}>Receive notifications for favorited items</div>
                                        </div>
                                        <div className={styles.toggle}>
                                            <div className={`${styles.toggleTrack} ${styles.toggleOn}`}>
                                                <div className={styles.toggleThumb}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.notificationRow}>
                                        <div>
                                            <div className={styles.notifTitle}>Updates</div>
                                            <div className={styles.notifDesc}>Receive product update notifications</div>
                                        </div>
                                        <div className={styles.toggle}>
                                            <div className={styles.toggleTrack}>
                                                <div className={styles.toggleThumb}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company Card */}
                            <div className={`${styles.mockup} ${styles.mockup3}`}>
                                <div className={styles.cardPreview}>
                                    <div className={styles.card}>
                                        <div className={styles.cardChip}></div>
                                        <div className={styles.cardNumber}>4532 3848 5627 8945</div>
                                        <div className={styles.cardFooter}>
                                            <div>
                                                <div className={styles.cardLabel}>Card holder</div>
                                                <div className={styles.cardValue}>Sophie Johnson</div>
                                            </div>
                                            <div>
                                                <div className={styles.cardLabel}>Expires</div>
                                                <div className={styles.cardValue}>01/27</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Examples Section */}
            <section className={styles.liveExamples}>
                <div className={styles.container}>
                    <h2 className={styles.sectionLabel}>Live examples</h2>
                    <div className={styles.examplesGrid}>
                        <Link href="/docs/components/data-table" className={styles.exampleCard}>
                            <div className={styles.examplePreview}>
                                <div className={styles.tablePreview}>
                                    <div className={styles.tableHeader}>
                                        <div className={styles.tableCell}>Name</div>
                                        <div className={styles.tableCell}>Email</div>
                                        <div className={styles.tableCell}>Role</div>
                                    </div>
                                    <div className={styles.tableRow}>
                                        <div className={styles.tableCell}>Alice Johnson</div>
                                        <div className={styles.tableCell}>alice@example.com</div>
                                        <div className={styles.tableCell}>Admin</div>
                                    </div>
                                    <div className={styles.tableRow}>
                                        <div className={styles.tableCell}>Bob Smith</div>
                                        <div className={styles.tableCell}>bob@example.com</div>
                                        <div className={styles.tableCell}>User</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.exampleInfo}>
                                <h3 className={styles.exampleTitle}>DataTable</h3>
                                <p className={styles.exampleDesc}>Enterprise-grade tables with sorting, filtering, and virtualization</p>
                            </div>
                        </Link>

                        <Link href="/docs/components/form" className={styles.exampleCard}>
                            <div className={styles.examplePreview}>
                                <div className={styles.formPreview}>
                                    <div className={styles.formField}>
                                        <div className={styles.formLabel}>Email address</div>
                                        <div className={styles.formInput}>user@example.com</div>
                                    </div>
                                    <div className={styles.formField}>
                                        <div className={styles.formLabel}>Password</div>
                                        <div className={styles.formInput}>••••••••</div>
                                    </div>
                                    <div className={styles.formButton}>Sign in</div>
                                </div>
                            </div>
                            <div className={styles.exampleInfo}>
                                <h3 className={styles.exampleTitle}>Forms</h3>
                                <p className={styles.exampleDesc}>Complex forms with validation, multi-step workflows, and field arrays</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.featuresGrid}>
                        <div className={styles.feature}>
                            <Zap className={styles.featureIcon} size={24} />
                            <h3 className={styles.featureTitle}>Performance first</h3>
                            <p className={styles.featureText}>
                                Every component is optimized for real-world enterprise scale. DataTables use virtualization,
                                forms use efficient validation, and all components are memoized by default.
                            </p>
                        </div>

                        <div className={styles.feature}>
                            <Shield className={styles.featureIcon} size={24} />
                            <h3 className={styles.featureTitle}>Built for everyone</h3>
                            <p className={styles.featureText}>
                                WCAG 2.2 AA compliant out of the box. Full keyboard navigation, screen reader support,
                                and focus management included.
                            </p>
                        </div>

                        <div className={styles.feature}>
                            <Gauge className={styles.featureIcon} size={24} />
                            <h3 className={styles.featureTitle}>Enterprise ready</h3>
                            <p className={styles.featureText}>
                                Unlike general-purpose UI libraries, Oxygenix UI is built from the ground up for complex
                                business applications that need to handle large datasets and permission-based UIs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Source Section */}
            <section className={styles.openSource}>
                <div className={styles.container}>
                    <h2 className={styles.openSourceTitle}>Open source and free to use</h2>
                    <p className={styles.openSourceText}>
                        Oxygenix UI is MIT licensed. Use it in personal projects, commercial products,
                        or anywhere you need reliable components.
                    </p>
                    <Link href="https://github.com/oxygenix-ui/oxygenix-ui" className={styles.githubButton}>
                        <Github size={20} />
                        View on GitHub
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <p className={styles.footerText}>
                        Built with care for the developer community
                    </p>
                </div>
            </footer>
        </>
    )
}
