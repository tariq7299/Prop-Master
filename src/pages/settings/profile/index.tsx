import ProfileForm from './profile-form'
import ContentSection from '../components/content-section'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is your personal and login info'
    >
      <ProfileForm />
    </ContentSection>
  )
}
