const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const senha = 'admin123';
  const hash = await bcrypt.hash(senha, 10);

  await prisma.usuario.update({
    where: { email: 'admin@email.com' },
    data: { senha: hash },
  });

  console.log('Senha do admin atualizada com hash!');
  process.exit();
})();
