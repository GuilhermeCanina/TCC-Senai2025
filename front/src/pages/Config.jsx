import AvatarUploader from '../components/MudarAvatar';
import MudarNome from '../components/MudarNome';

function Config() {
  return (
    <div>
      <h1>Configurações</h1>
      <section>
        <h2>Alterar Avatar</h2>
        <AvatarUploader currentAvatar={null} userInitial={""} />
      </section>

      <section>
        <h2>Alterar Nome</h2>
        <MudarNome />
      </section>
    </div>
  );
}

export default Config;
