export default function ProfileScreen({ user }) {
  return (
    <>
      <h1 className="vf-page-title">Profile</h1>
      <p className="vf-page-sub">Account details from your current session.</p>
      <section className="vf-card">
        <dl className="vf-profile-list">
          <div>
            <dt>Name</dt>
            <dd>{user?.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt>User ID</dt>
            <dd>{user?.id}</dd>
          </div>
        </dl>
      </section>
    </>
  )
}
