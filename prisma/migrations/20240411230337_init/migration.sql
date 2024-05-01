-- CreateTable
CREATE TABLE "armadilha" (
    "codarm" SERIAL NOT NULL,
    "desarm" VARCHAR(80),

    CONSTRAINT "armadilha_pkey" PRIMARY KEY ("codarm")
);

-- CreateTable
CREATE TABLE "caso" (
    "codcas" SERIAL NOT NULL,
    "codpes" INTEGER NOT NULL,
    "latcas" DECIMAL(10,6),
    "lngcas" DECIMAL(10,6),
    "datcadcas" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "caso_pkey" PRIMARY KEY ("codcas")
);

-- CreateTable
CREATE TABLE "pessoa" (
    "codpes" SERIAL NOT NULL,
    "nompes" VARCHAR(40),

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("codpes")
);

-- CreateTable
CREATE TABLE "residencia" (
    "codres" SERIAL NOT NULL,
    "latres" DECIMAL(10,6),
    "lngres" DECIMAL(10,6),
    "cplres" VARCHAR(40) NOT NULL,

    CONSTRAINT "residencia_pkey" PRIMARY KEY ("codres")
);

-- CreateTable
CREATE TABLE "residencia_armadilha" (
    "codres" INTEGER NOT NULL,
    "codarm" INTEGER NOT NULL,
    "datini" DATE,
    "datfim" DATE NOT NULL,
    "obsarm" TEXT,
    "codrar" SERIAL NOT NULL,

    CONSTRAINT "resarm_pk" PRIMARY KEY ("codrar")
);

-- CreateTable
CREATE TABLE "residencia_pessoa" (
    "codres" INTEGER NOT NULL,
    "codpes" INTEGER NOT NULL,
    "datcad" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "residencia_pessoa_pkey" PRIMARY KEY ("codres","codpes")
);

-- CreateTable
CREATE TABLE "usuario" (
    "codusu" SERIAL NOT NULL,
    "logusu" VARCHAR(20) NOT NULL,
    "senusu" VARCHAR(100) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("codusu")
);

-- AddForeignKey
ALTER TABLE "caso" ADD CONSTRAINT "caso_codpes_fkey" FOREIGN KEY ("codpes") REFERENCES "pessoa"("codpes") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "residencia_armadilha" ADD CONSTRAINT "residencia_armadilha_codarm_fkey" FOREIGN KEY ("codarm") REFERENCES "armadilha"("codarm") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "residencia_armadilha" ADD CONSTRAINT "residencia_armadilha_codres_fkey" FOREIGN KEY ("codres") REFERENCES "residencia"("codres") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "residencia_pessoa" ADD CONSTRAINT "residencia_pessoa_codpes_fkey" FOREIGN KEY ("codpes") REFERENCES "pessoa"("codpes") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "residencia_pessoa" ADD CONSTRAINT "residencia_pessoa_codres_fkey" FOREIGN KEY ("codres") REFERENCES "residencia"("codres") ON DELETE NO ACTION ON UPDATE NO ACTION;
