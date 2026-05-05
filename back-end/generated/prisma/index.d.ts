
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Aluno
 * 
 */
export type Aluno = $Result.DefaultSelection<Prisma.$AlunoPayload>
/**
 * Model Turma
 * 
 */
export type Turma = $Result.DefaultSelection<Prisma.$TurmaPayload>
/**
 * Model Curso
 * 
 */
export type Curso = $Result.DefaultSelection<Prisma.$CursoPayload>
/**
 * Model Disciplina
 * 
 */
export type Disciplina = $Result.DefaultSelection<Prisma.$DisciplinaPayload>
/**
 * Model Nota
 * 
 */
export type Nota = $Result.DefaultSelection<Prisma.$NotaPayload>
/**
 * Model Mensagem
 * 
 */
export type Mensagem = $Result.DefaultSelection<Prisma.$MensagemPayload>
/**
 * Model Aviso
 * 
 */
export type Aviso = $Result.DefaultSelection<Prisma.$AvisoPayload>
/**
 * Model Evento
 * 
 */
export type Evento = $Result.DefaultSelection<Prisma.$EventoPayload>
/**
 * Model Reuniao
 * 
 */
export type Reuniao = $Result.DefaultSelection<Prisma.$ReuniaoPayload>
/**
 * Model ReuniaoParticipante
 * 
 */
export type ReuniaoParticipante = $Result.DefaultSelection<Prisma.$ReuniaoParticipantePayload>
/**
 * Model Relatorio
 * 
 */
export type Relatorio = $Result.DefaultSelection<Prisma.$RelatorioPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model CodigoProfessor
 * 
 */
export type CodigoProfessor = $Result.DefaultSelection<Prisma.$CodigoProfessorPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs>;

  /**
   * `prisma.aluno`: Exposes CRUD operations for the **Aluno** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alunos
    * const alunos = await prisma.aluno.findMany()
    * ```
    */
  get aluno(): Prisma.AlunoDelegate<ExtArgs>;

  /**
   * `prisma.turma`: Exposes CRUD operations for the **Turma** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Turmas
    * const turmas = await prisma.turma.findMany()
    * ```
    */
  get turma(): Prisma.TurmaDelegate<ExtArgs>;

  /**
   * `prisma.curso`: Exposes CRUD operations for the **Curso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cursos
    * const cursos = await prisma.curso.findMany()
    * ```
    */
  get curso(): Prisma.CursoDelegate<ExtArgs>;

  /**
   * `prisma.disciplina`: Exposes CRUD operations for the **Disciplina** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disciplinas
    * const disciplinas = await prisma.disciplina.findMany()
    * ```
    */
  get disciplina(): Prisma.DisciplinaDelegate<ExtArgs>;

  /**
   * `prisma.nota`: Exposes CRUD operations for the **Nota** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notas
    * const notas = await prisma.nota.findMany()
    * ```
    */
  get nota(): Prisma.NotaDelegate<ExtArgs>;

  /**
   * `prisma.mensagem`: Exposes CRUD operations for the **Mensagem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mensagems
    * const mensagems = await prisma.mensagem.findMany()
    * ```
    */
  get mensagem(): Prisma.MensagemDelegate<ExtArgs>;

  /**
   * `prisma.aviso`: Exposes CRUD operations for the **Aviso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Avisos
    * const avisos = await prisma.aviso.findMany()
    * ```
    */
  get aviso(): Prisma.AvisoDelegate<ExtArgs>;

  /**
   * `prisma.evento`: Exposes CRUD operations for the **Evento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eventos
    * const eventos = await prisma.evento.findMany()
    * ```
    */
  get evento(): Prisma.EventoDelegate<ExtArgs>;

  /**
   * `prisma.reuniao`: Exposes CRUD operations for the **Reuniao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reuniaos
    * const reuniaos = await prisma.reuniao.findMany()
    * ```
    */
  get reuniao(): Prisma.ReuniaoDelegate<ExtArgs>;

  /**
   * `prisma.reuniaoParticipante`: Exposes CRUD operations for the **ReuniaoParticipante** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReuniaoParticipantes
    * const reuniaoParticipantes = await prisma.reuniaoParticipante.findMany()
    * ```
    */
  get reuniaoParticipante(): Prisma.ReuniaoParticipanteDelegate<ExtArgs>;

  /**
   * `prisma.relatorio`: Exposes CRUD operations for the **Relatorio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Relatorios
    * const relatorios = await prisma.relatorio.findMany()
    * ```
    */
  get relatorio(): Prisma.RelatorioDelegate<ExtArgs>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs>;

  /**
   * `prisma.codigoProfessor`: Exposes CRUD operations for the **CodigoProfessor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CodigoProfessors
    * const codigoProfessors = await prisma.codigoProfessor.findMany()
    * ```
    */
  get codigoProfessor(): Prisma.CodigoProfessorDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Aluno: 'Aluno',
    Turma: 'Turma',
    Curso: 'Curso',
    Disciplina: 'Disciplina',
    Nota: 'Nota',
    Mensagem: 'Mensagem',
    Aviso: 'Aviso',
    Evento: 'Evento',
    Reuniao: 'Reuniao',
    ReuniaoParticipante: 'ReuniaoParticipante',
    Relatorio: 'Relatorio',
    Feedback: 'Feedback',
    CodigoProfessor: 'CodigoProfessor'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "usuario" | "aluno" | "turma" | "curso" | "disciplina" | "nota" | "mensagem" | "aviso" | "evento" | "reuniao" | "reuniaoParticipante" | "relatorio" | "feedback" | "codigoProfessor"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Aluno: {
        payload: Prisma.$AlunoPayload<ExtArgs>
        fields: Prisma.AlunoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlunoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlunoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          findFirst: {
            args: Prisma.AlunoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlunoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          findMany: {
            args: Prisma.AlunoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>[]
          }
          create: {
            args: Prisma.AlunoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          createMany: {
            args: Prisma.AlunoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlunoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>[]
          }
          delete: {
            args: Prisma.AlunoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          update: {
            args: Prisma.AlunoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          deleteMany: {
            args: Prisma.AlunoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlunoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlunoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlunoPayload>
          }
          aggregate: {
            args: Prisma.AlunoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAluno>
          }
          groupBy: {
            args: Prisma.AlunoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlunoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlunoCountArgs<ExtArgs>
            result: $Utils.Optional<AlunoCountAggregateOutputType> | number
          }
        }
      }
      Turma: {
        payload: Prisma.$TurmaPayload<ExtArgs>
        fields: Prisma.TurmaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TurmaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TurmaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findFirst: {
            args: Prisma.TurmaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TurmaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findMany: {
            args: Prisma.TurmaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          create: {
            args: Prisma.TurmaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          createMany: {
            args: Prisma.TurmaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TurmaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          delete: {
            args: Prisma.TurmaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          update: {
            args: Prisma.TurmaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          deleteMany: {
            args: Prisma.TurmaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TurmaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TurmaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          aggregate: {
            args: Prisma.TurmaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTurma>
          }
          groupBy: {
            args: Prisma.TurmaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TurmaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TurmaCountArgs<ExtArgs>
            result: $Utils.Optional<TurmaCountAggregateOutputType> | number
          }
        }
      }
      Curso: {
        payload: Prisma.$CursoPayload<ExtArgs>
        fields: Prisma.CursoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CursoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CursoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findFirst: {
            args: Prisma.CursoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CursoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          findMany: {
            args: Prisma.CursoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          create: {
            args: Prisma.CursoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          createMany: {
            args: Prisma.CursoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CursoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>[]
          }
          delete: {
            args: Prisma.CursoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          update: {
            args: Prisma.CursoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          deleteMany: {
            args: Prisma.CursoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CursoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CursoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CursoPayload>
          }
          aggregate: {
            args: Prisma.CursoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurso>
          }
          groupBy: {
            args: Prisma.CursoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CursoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CursoCountArgs<ExtArgs>
            result: $Utils.Optional<CursoCountAggregateOutputType> | number
          }
        }
      }
      Disciplina: {
        payload: Prisma.$DisciplinaPayload<ExtArgs>
        fields: Prisma.DisciplinaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisciplinaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisciplinaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          findFirst: {
            args: Prisma.DisciplinaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisciplinaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          findMany: {
            args: Prisma.DisciplinaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>[]
          }
          create: {
            args: Prisma.DisciplinaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          createMany: {
            args: Prisma.DisciplinaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisciplinaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>[]
          }
          delete: {
            args: Prisma.DisciplinaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          update: {
            args: Prisma.DisciplinaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          deleteMany: {
            args: Prisma.DisciplinaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisciplinaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DisciplinaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          aggregate: {
            args: Prisma.DisciplinaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisciplina>
          }
          groupBy: {
            args: Prisma.DisciplinaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisciplinaCountArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaCountAggregateOutputType> | number
          }
        }
      }
      Nota: {
        payload: Prisma.$NotaPayload<ExtArgs>
        fields: Prisma.NotaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          findFirst: {
            args: Prisma.NotaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          findMany: {
            args: Prisma.NotaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>[]
          }
          create: {
            args: Prisma.NotaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          createMany: {
            args: Prisma.NotaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>[]
          }
          delete: {
            args: Prisma.NotaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          update: {
            args: Prisma.NotaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          deleteMany: {
            args: Prisma.NotaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotaPayload>
          }
          aggregate: {
            args: Prisma.NotaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNota>
          }
          groupBy: {
            args: Prisma.NotaGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotaGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotaCountArgs<ExtArgs>
            result: $Utils.Optional<NotaCountAggregateOutputType> | number
          }
        }
      }
      Mensagem: {
        payload: Prisma.$MensagemPayload<ExtArgs>
        fields: Prisma.MensagemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MensagemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MensagemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          findFirst: {
            args: Prisma.MensagemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MensagemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          findMany: {
            args: Prisma.MensagemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>[]
          }
          create: {
            args: Prisma.MensagemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          createMany: {
            args: Prisma.MensagemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MensagemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>[]
          }
          delete: {
            args: Prisma.MensagemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          update: {
            args: Prisma.MensagemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          deleteMany: {
            args: Prisma.MensagemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MensagemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MensagemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagemPayload>
          }
          aggregate: {
            args: Prisma.MensagemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMensagem>
          }
          groupBy: {
            args: Prisma.MensagemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MensagemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MensagemCountArgs<ExtArgs>
            result: $Utils.Optional<MensagemCountAggregateOutputType> | number
          }
        }
      }
      Aviso: {
        payload: Prisma.$AvisoPayload<ExtArgs>
        fields: Prisma.AvisoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvisoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvisoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          findFirst: {
            args: Prisma.AvisoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvisoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          findMany: {
            args: Prisma.AvisoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>[]
          }
          create: {
            args: Prisma.AvisoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          createMany: {
            args: Prisma.AvisoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvisoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>[]
          }
          delete: {
            args: Prisma.AvisoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          update: {
            args: Prisma.AvisoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          deleteMany: {
            args: Prisma.AvisoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvisoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AvisoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvisoPayload>
          }
          aggregate: {
            args: Prisma.AvisoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAviso>
          }
          groupBy: {
            args: Prisma.AvisoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvisoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvisoCountArgs<ExtArgs>
            result: $Utils.Optional<AvisoCountAggregateOutputType> | number
          }
        }
      }
      Evento: {
        payload: Prisma.$EventoPayload<ExtArgs>
        fields: Prisma.EventoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          findFirst: {
            args: Prisma.EventoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          findMany: {
            args: Prisma.EventoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>[]
          }
          create: {
            args: Prisma.EventoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          createMany: {
            args: Prisma.EventoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>[]
          }
          delete: {
            args: Prisma.EventoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          update: {
            args: Prisma.EventoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          deleteMany: {
            args: Prisma.EventoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventoPayload>
          }
          aggregate: {
            args: Prisma.EventoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvento>
          }
          groupBy: {
            args: Prisma.EventoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventoCountArgs<ExtArgs>
            result: $Utils.Optional<EventoCountAggregateOutputType> | number
          }
        }
      }
      Reuniao: {
        payload: Prisma.$ReuniaoPayload<ExtArgs>
        fields: Prisma.ReuniaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReuniaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReuniaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          findFirst: {
            args: Prisma.ReuniaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReuniaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          findMany: {
            args: Prisma.ReuniaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>[]
          }
          create: {
            args: Prisma.ReuniaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          createMany: {
            args: Prisma.ReuniaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReuniaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>[]
          }
          delete: {
            args: Prisma.ReuniaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          update: {
            args: Prisma.ReuniaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          deleteMany: {
            args: Prisma.ReuniaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReuniaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReuniaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoPayload>
          }
          aggregate: {
            args: Prisma.ReuniaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReuniao>
          }
          groupBy: {
            args: Prisma.ReuniaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReuniaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReuniaoCountArgs<ExtArgs>
            result: $Utils.Optional<ReuniaoCountAggregateOutputType> | number
          }
        }
      }
      ReuniaoParticipante: {
        payload: Prisma.$ReuniaoParticipantePayload<ExtArgs>
        fields: Prisma.ReuniaoParticipanteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReuniaoParticipanteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReuniaoParticipanteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          findFirst: {
            args: Prisma.ReuniaoParticipanteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReuniaoParticipanteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          findMany: {
            args: Prisma.ReuniaoParticipanteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>[]
          }
          create: {
            args: Prisma.ReuniaoParticipanteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          createMany: {
            args: Prisma.ReuniaoParticipanteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReuniaoParticipanteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>[]
          }
          delete: {
            args: Prisma.ReuniaoParticipanteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          update: {
            args: Prisma.ReuniaoParticipanteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          deleteMany: {
            args: Prisma.ReuniaoParticipanteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReuniaoParticipanteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReuniaoParticipanteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReuniaoParticipantePayload>
          }
          aggregate: {
            args: Prisma.ReuniaoParticipanteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReuniaoParticipante>
          }
          groupBy: {
            args: Prisma.ReuniaoParticipanteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReuniaoParticipanteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReuniaoParticipanteCountArgs<ExtArgs>
            result: $Utils.Optional<ReuniaoParticipanteCountAggregateOutputType> | number
          }
        }
      }
      Relatorio: {
        payload: Prisma.$RelatorioPayload<ExtArgs>
        fields: Prisma.RelatorioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RelatorioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RelatorioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          findFirst: {
            args: Prisma.RelatorioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RelatorioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          findMany: {
            args: Prisma.RelatorioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>[]
          }
          create: {
            args: Prisma.RelatorioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          createMany: {
            args: Prisma.RelatorioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RelatorioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>[]
          }
          delete: {
            args: Prisma.RelatorioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          update: {
            args: Prisma.RelatorioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          deleteMany: {
            args: Prisma.RelatorioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RelatorioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RelatorioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelatorioPayload>
          }
          aggregate: {
            args: Prisma.RelatorioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRelatorio>
          }
          groupBy: {
            args: Prisma.RelatorioGroupByArgs<ExtArgs>
            result: $Utils.Optional<RelatorioGroupByOutputType>[]
          }
          count: {
            args: Prisma.RelatorioCountArgs<ExtArgs>
            result: $Utils.Optional<RelatorioCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      CodigoProfessor: {
        payload: Prisma.$CodigoProfessorPayload<ExtArgs>
        fields: Prisma.CodigoProfessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodigoProfessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodigoProfessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          findFirst: {
            args: Prisma.CodigoProfessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodigoProfessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          findMany: {
            args: Prisma.CodigoProfessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>[]
          }
          create: {
            args: Prisma.CodigoProfessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          createMany: {
            args: Prisma.CodigoProfessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodigoProfessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>[]
          }
          delete: {
            args: Prisma.CodigoProfessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          update: {
            args: Prisma.CodigoProfessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          deleteMany: {
            args: Prisma.CodigoProfessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodigoProfessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CodigoProfessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodigoProfessorPayload>
          }
          aggregate: {
            args: Prisma.CodigoProfessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodigoProfessor>
          }
          groupBy: {
            args: Prisma.CodigoProfessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodigoProfessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodigoProfessorCountArgs<ExtArgs>
            result: $Utils.Optional<CodigoProfessorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    alunos: number
    turmas: number
    disciplinas: number
    cursos: number
    mensagensEnviadas: number
    mensagensRecebidas: number
    reunioes: number
    reunioesAgendadas: number
    feedbacks: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alunos?: boolean | UsuarioCountOutputTypeCountAlunosArgs
    turmas?: boolean | UsuarioCountOutputTypeCountTurmasArgs
    disciplinas?: boolean | UsuarioCountOutputTypeCountDisciplinasArgs
    cursos?: boolean | UsuarioCountOutputTypeCountCursosArgs
    mensagensEnviadas?: boolean | UsuarioCountOutputTypeCountMensagensEnviadasArgs
    mensagensRecebidas?: boolean | UsuarioCountOutputTypeCountMensagensRecebidasArgs
    reunioes?: boolean | UsuarioCountOutputTypeCountReunioesArgs
    reunioesAgendadas?: boolean | UsuarioCountOutputTypeCountReunioesAgendadasArgs
    feedbacks?: boolean | UsuarioCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAlunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlunoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountTurmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountDisciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCursosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CursoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMensagensEnviadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMensagensRecebidasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountReunioesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReuniaoParticipanteWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountReunioesAgendadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReuniaoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type AlunoCountOutputType
   */

  export type AlunoCountOutputType = {
    notas: number
  }

  export type AlunoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notas?: boolean | AlunoCountOutputTypeCountNotasArgs
  }

  // Custom InputTypes
  /**
   * AlunoCountOutputType without action
   */
  export type AlunoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlunoCountOutputType
     */
    select?: AlunoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlunoCountOutputType without action
   */
  export type AlunoCountOutputTypeCountNotasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotaWhereInput
  }


  /**
   * Count Type TurmaCountOutputType
   */

  export type TurmaCountOutputType = {
    alunos: number
    disciplinas: number
  }

  export type TurmaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alunos?: boolean | TurmaCountOutputTypeCountAlunosArgs
    disciplinas?: boolean | TurmaCountOutputTypeCountDisciplinasArgs
  }

  // Custom InputTypes
  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TurmaCountOutputType
     */
    select?: TurmaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeCountAlunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlunoWhereInput
  }

  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeCountDisciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaWhereInput
  }


  /**
   * Count Type CursoCountOutputType
   */

  export type CursoCountOutputType = {
    disciplinas: number
    alunos: number
    turmas: number
    professores: number
  }

  export type CursoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disciplinas?: boolean | CursoCountOutputTypeCountDisciplinasArgs
    alunos?: boolean | CursoCountOutputTypeCountAlunosArgs
    turmas?: boolean | CursoCountOutputTypeCountTurmasArgs
    professores?: boolean | CursoCountOutputTypeCountProfessoresArgs
  }

  // Custom InputTypes
  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CursoCountOutputType
     */
    select?: CursoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountDisciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountAlunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlunoWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountTurmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
  }

  /**
   * CursoCountOutputType without action
   */
  export type CursoCountOutputTypeCountProfessoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * Count Type DisciplinaCountOutputType
   */

  export type DisciplinaCountOutputType = {
    notas: number
    turmas: number
  }

  export type DisciplinaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notas?: boolean | DisciplinaCountOutputTypeCountNotasArgs
    turmas?: boolean | DisciplinaCountOutputTypeCountTurmasArgs
  }

  // Custom InputTypes
  /**
   * DisciplinaCountOutputType without action
   */
  export type DisciplinaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaCountOutputType
     */
    select?: DisciplinaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DisciplinaCountOutputType without action
   */
  export type DisciplinaCountOutputTypeCountNotasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotaWhereInput
  }

  /**
   * DisciplinaCountOutputType without action
   */
  export type DisciplinaCountOutputTypeCountTurmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
  }


  /**
   * Count Type ReuniaoCountOutputType
   */

  export type ReuniaoCountOutputType = {
    participantes: number
  }

  export type ReuniaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participantes?: boolean | ReuniaoCountOutputTypeCountParticipantesArgs
  }

  // Custom InputTypes
  /**
   * ReuniaoCountOutputType without action
   */
  export type ReuniaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoCountOutputType
     */
    select?: ReuniaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReuniaoCountOutputType without action
   */
  export type ReuniaoCountOutputTypeCountParticipantesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReuniaoParticipanteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    telefone: string | null
    perfil: string | null
    imagem: string | null
    relacaoEducando: string | null
    codigoVerificacao: string | null
    ultimoLogin: Date | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    telefone: string | null
    perfil: string | null
    imagem: string | null
    relacaoEducando: string | null
    codigoVerificacao: string | null
    ultimoLogin: Date | null
    ativo: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    telefone: number
    perfil: number
    imagem: number
    relacaoEducando: number
    codigoVerificacao: number
    ultimoLogin: number
    ativo: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    perfil?: true
    imagem?: true
    relacaoEducando?: true
    codigoVerificacao?: true
    ultimoLogin?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    perfil?: true
    imagem?: true
    relacaoEducando?: true
    codigoVerificacao?: true
    ultimoLogin?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    telefone?: true
    perfil?: true
    imagem?: true
    relacaoEducando?: true
    codigoVerificacao?: true
    ultimoLogin?: true
    ativo?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem: string | null
    relacaoEducando: string | null
    codigoVerificacao: string | null
    ultimoLogin: Date | null
    ativo: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    perfil?: boolean
    imagem?: boolean
    relacaoEducando?: boolean
    codigoVerificacao?: boolean
    ultimoLogin?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    alunos?: boolean | Usuario$alunosArgs<ExtArgs>
    turmas?: boolean | Usuario$turmasArgs<ExtArgs>
    disciplinas?: boolean | Usuario$disciplinasArgs<ExtArgs>
    cursos?: boolean | Usuario$cursosArgs<ExtArgs>
    mensagensEnviadas?: boolean | Usuario$mensagensEnviadasArgs<ExtArgs>
    mensagensRecebidas?: boolean | Usuario$mensagensRecebidasArgs<ExtArgs>
    reunioes?: boolean | Usuario$reunioesArgs<ExtArgs>
    reunioesAgendadas?: boolean | Usuario$reunioesAgendadasArgs<ExtArgs>
    codigoProfessor?: boolean | Usuario$codigoProfessorArgs<ExtArgs>
    feedbacks?: boolean | Usuario$feedbacksArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    perfil?: boolean
    imagem?: boolean
    relacaoEducando?: boolean
    codigoVerificacao?: boolean
    ultimoLogin?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    perfil?: boolean
    imagem?: boolean
    relacaoEducando?: boolean
    codigoVerificacao?: boolean
    ultimoLogin?: boolean
    ativo?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alunos?: boolean | Usuario$alunosArgs<ExtArgs>
    turmas?: boolean | Usuario$turmasArgs<ExtArgs>
    disciplinas?: boolean | Usuario$disciplinasArgs<ExtArgs>
    cursos?: boolean | Usuario$cursosArgs<ExtArgs>
    mensagensEnviadas?: boolean | Usuario$mensagensEnviadasArgs<ExtArgs>
    mensagensRecebidas?: boolean | Usuario$mensagensRecebidasArgs<ExtArgs>
    reunioes?: boolean | Usuario$reunioesArgs<ExtArgs>
    reunioesAgendadas?: boolean | Usuario$reunioesAgendadasArgs<ExtArgs>
    codigoProfessor?: boolean | Usuario$codigoProfessorArgs<ExtArgs>
    feedbacks?: boolean | Usuario$feedbacksArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      alunos: Prisma.$AlunoPayload<ExtArgs>[]
      turmas: Prisma.$TurmaPayload<ExtArgs>[]
      disciplinas: Prisma.$DisciplinaPayload<ExtArgs>[]
      cursos: Prisma.$CursoPayload<ExtArgs>[]
      mensagensEnviadas: Prisma.$MensagemPayload<ExtArgs>[]
      mensagensRecebidas: Prisma.$MensagemPayload<ExtArgs>[]
      reunioes: Prisma.$ReuniaoParticipantePayload<ExtArgs>[]
      reunioesAgendadas: Prisma.$ReuniaoPayload<ExtArgs>[]
      codigoProfessor: Prisma.$CodigoProfessorPayload<ExtArgs> | null
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string
      senha: string
      telefone: string
      perfil: string
      imagem: string | null
      relacaoEducando: string | null
      codigoVerificacao: string | null
      ultimoLogin: Date | null
      ativo: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alunos<T extends Usuario$alunosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$alunosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findMany"> | Null>
    turmas<T extends Usuario$turmasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$turmasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany"> | Null>
    disciplinas<T extends Usuario$disciplinasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$disciplinasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findMany"> | Null>
    cursos<T extends Usuario$cursosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$cursosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findMany"> | Null>
    mensagensEnviadas<T extends Usuario$mensagensEnviadasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$mensagensEnviadasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany"> | Null>
    mensagensRecebidas<T extends Usuario$mensagensRecebidasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$mensagensRecebidasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany"> | Null>
    reunioes<T extends Usuario$reunioesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$reunioesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findMany"> | Null>
    reunioesAgendadas<T extends Usuario$reunioesAgendadasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$reunioesAgendadasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findMany"> | Null>
    codigoProfessor<T extends Usuario$codigoProfessorArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$codigoProfessorArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    feedbacks<T extends Usuario$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */ 
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly telefone: FieldRef<"Usuario", 'String'>
    readonly perfil: FieldRef<"Usuario", 'String'>
    readonly imagem: FieldRef<"Usuario", 'String'>
    readonly relacaoEducando: FieldRef<"Usuario", 'String'>
    readonly codigoVerificacao: FieldRef<"Usuario", 'String'>
    readonly ultimoLogin: FieldRef<"Usuario", 'DateTime'>
    readonly ativo: FieldRef<"Usuario", 'Boolean'>
    readonly criadoEm: FieldRef<"Usuario", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
  }

  /**
   * Usuario.alunos
   */
  export type Usuario$alunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    where?: AlunoWhereInput
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    cursor?: AlunoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Usuario.turmas
   */
  export type Usuario$turmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    cursor?: TurmaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Usuario.disciplinas
   */
  export type Usuario$disciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    where?: DisciplinaWhereInput
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    cursor?: DisciplinaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Usuario.cursos
   */
  export type Usuario$cursosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    where?: CursoWhereInput
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    cursor?: CursoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Usuario.mensagensEnviadas
   */
  export type Usuario$mensagensEnviadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    cursor?: MensagemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Usuario.mensagensRecebidas
   */
  export type Usuario$mensagensRecebidasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    cursor?: MensagemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Usuario.reunioes
   */
  export type Usuario$reunioesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    where?: ReuniaoParticipanteWhereInput
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    cursor?: ReuniaoParticipanteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReuniaoParticipanteScalarFieldEnum | ReuniaoParticipanteScalarFieldEnum[]
  }

  /**
   * Usuario.reunioesAgendadas
   */
  export type Usuario$reunioesAgendadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    where?: ReuniaoWhereInput
    orderBy?: ReuniaoOrderByWithRelationInput | ReuniaoOrderByWithRelationInput[]
    cursor?: ReuniaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReuniaoScalarFieldEnum | ReuniaoScalarFieldEnum[]
  }

  /**
   * Usuario.codigoProfessor
   */
  export type Usuario$codigoProfessorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    where?: CodigoProfessorWhereInput
  }

  /**
   * Usuario.feedbacks
   */
  export type Usuario$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Aluno
   */

  export type AggregateAluno = {
    _count: AlunoCountAggregateOutputType | null
    _avg: AlunoAvgAggregateOutputType | null
    _sum: AlunoSumAggregateOutputType | null
    _min: AlunoMinAggregateOutputType | null
    _max: AlunoMaxAggregateOutputType | null
  }

  export type AlunoAvgAggregateOutputType = {
    id: number | null
    turmaId: number | null
    encarregadoId: number | null
    cursoId: number | null
  }

  export type AlunoSumAggregateOutputType = {
    id: number | null
    turmaId: number | null
    encarregadoId: number | null
    cursoId: number | null
  }

  export type AlunoMinAggregateOutputType = {
    id: number | null
    nome: string | null
    matricula: string | null
    telefone: string | null
    email: string | null
    imagem: string | null
    classe: string | null
    dataNascimento: Date | null
    endereco: string | null
    turmaId: number | null
    encarregadoId: number | null
    cursoId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type AlunoMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    matricula: string | null
    telefone: string | null
    email: string | null
    imagem: string | null
    classe: string | null
    dataNascimento: Date | null
    endereco: string | null
    turmaId: number | null
    encarregadoId: number | null
    cursoId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type AlunoCountAggregateOutputType = {
    id: number
    nome: number
    matricula: number
    telefone: number
    email: number
    imagem: number
    classe: number
    dataNascimento: number
    endereco: number
    turmaId: number
    encarregadoId: number
    cursoId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type AlunoAvgAggregateInputType = {
    id?: true
    turmaId?: true
    encarregadoId?: true
    cursoId?: true
  }

  export type AlunoSumAggregateInputType = {
    id?: true
    turmaId?: true
    encarregadoId?: true
    cursoId?: true
  }

  export type AlunoMinAggregateInputType = {
    id?: true
    nome?: true
    matricula?: true
    telefone?: true
    email?: true
    imagem?: true
    classe?: true
    dataNascimento?: true
    endereco?: true
    turmaId?: true
    encarregadoId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type AlunoMaxAggregateInputType = {
    id?: true
    nome?: true
    matricula?: true
    telefone?: true
    email?: true
    imagem?: true
    classe?: true
    dataNascimento?: true
    endereco?: true
    turmaId?: true
    encarregadoId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type AlunoCountAggregateInputType = {
    id?: true
    nome?: true
    matricula?: true
    telefone?: true
    email?: true
    imagem?: true
    classe?: true
    dataNascimento?: true
    endereco?: true
    turmaId?: true
    encarregadoId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type AlunoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aluno to aggregate.
     */
    where?: AlunoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alunos to fetch.
     */
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlunoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alunos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alunos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alunos
    **/
    _count?: true | AlunoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlunoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlunoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlunoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlunoMaxAggregateInputType
  }

  export type GetAlunoAggregateType<T extends AlunoAggregateArgs> = {
        [P in keyof T & keyof AggregateAluno]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAluno[P]>
      : GetScalarType<T[P], AggregateAluno[P]>
  }




  export type AlunoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlunoWhereInput
    orderBy?: AlunoOrderByWithAggregationInput | AlunoOrderByWithAggregationInput[]
    by: AlunoScalarFieldEnum[] | AlunoScalarFieldEnum
    having?: AlunoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlunoCountAggregateInputType | true
    _avg?: AlunoAvgAggregateInputType
    _sum?: AlunoSumAggregateInputType
    _min?: AlunoMinAggregateInputType
    _max?: AlunoMaxAggregateInputType
  }

  export type AlunoGroupByOutputType = {
    id: number
    nome: string
    matricula: string
    telefone: string
    email: string | null
    imagem: string | null
    classe: string
    dataNascimento: Date | null
    endereco: string | null
    turmaId: number
    encarregadoId: number | null
    cursoId: number
    criadoEm: Date
    atualizadoEm: Date
    _count: AlunoCountAggregateOutputType | null
    _avg: AlunoAvgAggregateOutputType | null
    _sum: AlunoSumAggregateOutputType | null
    _min: AlunoMinAggregateOutputType | null
    _max: AlunoMaxAggregateOutputType | null
  }

  type GetAlunoGroupByPayload<T extends AlunoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlunoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlunoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlunoGroupByOutputType[P]>
            : GetScalarType<T[P], AlunoGroupByOutputType[P]>
        }
      >
    >


  export type AlunoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    matricula?: boolean
    telefone?: boolean
    email?: boolean
    imagem?: boolean
    classe?: boolean
    dataNascimento?: boolean
    endereco?: boolean
    turmaId?: boolean
    encarregadoId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    encarregado?: boolean | Aluno$encarregadoArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    notas?: boolean | Aluno$notasArgs<ExtArgs>
    _count?: boolean | AlunoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aluno"]>

  export type AlunoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    matricula?: boolean
    telefone?: boolean
    email?: boolean
    imagem?: boolean
    classe?: boolean
    dataNascimento?: boolean
    endereco?: boolean
    turmaId?: boolean
    encarregadoId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    encarregado?: boolean | Aluno$encarregadoArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aluno"]>

  export type AlunoSelectScalar = {
    id?: boolean
    nome?: boolean
    matricula?: boolean
    telefone?: boolean
    email?: boolean
    imagem?: boolean
    classe?: boolean
    dataNascimento?: boolean
    endereco?: boolean
    turmaId?: boolean
    encarregadoId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type AlunoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    encarregado?: boolean | Aluno$encarregadoArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    notas?: boolean | Aluno$notasArgs<ExtArgs>
    _count?: boolean | AlunoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlunoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    encarregado?: boolean | Aluno$encarregadoArgs<ExtArgs>
    curso?: boolean | CursoDefaultArgs<ExtArgs>
  }

  export type $AlunoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aluno"
    objects: {
      turma: Prisma.$TurmaPayload<ExtArgs>
      encarregado: Prisma.$UsuarioPayload<ExtArgs> | null
      curso: Prisma.$CursoPayload<ExtArgs>
      notas: Prisma.$NotaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      matricula: string
      telefone: string
      email: string | null
      imagem: string | null
      classe: string
      dataNascimento: Date | null
      endereco: string | null
      turmaId: number
      encarregadoId: number | null
      cursoId: number
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["aluno"]>
    composites: {}
  }

  type AlunoGetPayload<S extends boolean | null | undefined | AlunoDefaultArgs> = $Result.GetResult<Prisma.$AlunoPayload, S>

  type AlunoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlunoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlunoCountAggregateInputType | true
    }

  export interface AlunoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aluno'], meta: { name: 'Aluno' } }
    /**
     * Find zero or one Aluno that matches the filter.
     * @param {AlunoFindUniqueArgs} args - Arguments to find a Aluno
     * @example
     * // Get one Aluno
     * const aluno = await prisma.aluno.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlunoFindUniqueArgs>(args: SelectSubset<T, AlunoFindUniqueArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Aluno that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlunoFindUniqueOrThrowArgs} args - Arguments to find a Aluno
     * @example
     * // Get one Aluno
     * const aluno = await prisma.aluno.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlunoFindUniqueOrThrowArgs>(args: SelectSubset<T, AlunoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Aluno that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoFindFirstArgs} args - Arguments to find a Aluno
     * @example
     * // Get one Aluno
     * const aluno = await prisma.aluno.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlunoFindFirstArgs>(args?: SelectSubset<T, AlunoFindFirstArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Aluno that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoFindFirstOrThrowArgs} args - Arguments to find a Aluno
     * @example
     * // Get one Aluno
     * const aluno = await prisma.aluno.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlunoFindFirstOrThrowArgs>(args?: SelectSubset<T, AlunoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alunos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alunos
     * const alunos = await prisma.aluno.findMany()
     * 
     * // Get first 10 Alunos
     * const alunos = await prisma.aluno.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alunoWithIdOnly = await prisma.aluno.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlunoFindManyArgs>(args?: SelectSubset<T, AlunoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Aluno.
     * @param {AlunoCreateArgs} args - Arguments to create a Aluno.
     * @example
     * // Create one Aluno
     * const Aluno = await prisma.aluno.create({
     *   data: {
     *     // ... data to create a Aluno
     *   }
     * })
     * 
     */
    create<T extends AlunoCreateArgs>(args: SelectSubset<T, AlunoCreateArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alunos.
     * @param {AlunoCreateManyArgs} args - Arguments to create many Alunos.
     * @example
     * // Create many Alunos
     * const aluno = await prisma.aluno.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlunoCreateManyArgs>(args?: SelectSubset<T, AlunoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alunos and returns the data saved in the database.
     * @param {AlunoCreateManyAndReturnArgs} args - Arguments to create many Alunos.
     * @example
     * // Create many Alunos
     * const aluno = await prisma.aluno.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alunos and only return the `id`
     * const alunoWithIdOnly = await prisma.aluno.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlunoCreateManyAndReturnArgs>(args?: SelectSubset<T, AlunoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Aluno.
     * @param {AlunoDeleteArgs} args - Arguments to delete one Aluno.
     * @example
     * // Delete one Aluno
     * const Aluno = await prisma.aluno.delete({
     *   where: {
     *     // ... filter to delete one Aluno
     *   }
     * })
     * 
     */
    delete<T extends AlunoDeleteArgs>(args: SelectSubset<T, AlunoDeleteArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Aluno.
     * @param {AlunoUpdateArgs} args - Arguments to update one Aluno.
     * @example
     * // Update one Aluno
     * const aluno = await prisma.aluno.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlunoUpdateArgs>(args: SelectSubset<T, AlunoUpdateArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alunos.
     * @param {AlunoDeleteManyArgs} args - Arguments to filter Alunos to delete.
     * @example
     * // Delete a few Alunos
     * const { count } = await prisma.aluno.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlunoDeleteManyArgs>(args?: SelectSubset<T, AlunoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alunos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alunos
     * const aluno = await prisma.aluno.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlunoUpdateManyArgs>(args: SelectSubset<T, AlunoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Aluno.
     * @param {AlunoUpsertArgs} args - Arguments to update or create a Aluno.
     * @example
     * // Update or create a Aluno
     * const aluno = await prisma.aluno.upsert({
     *   create: {
     *     // ... data to create a Aluno
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aluno we want to update
     *   }
     * })
     */
    upsert<T extends AlunoUpsertArgs>(args: SelectSubset<T, AlunoUpsertArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alunos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoCountArgs} args - Arguments to filter Alunos to count.
     * @example
     * // Count the number of Alunos
     * const count = await prisma.aluno.count({
     *   where: {
     *     // ... the filter for the Alunos we want to count
     *   }
     * })
    **/
    count<T extends AlunoCountArgs>(
      args?: Subset<T, AlunoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlunoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aluno.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlunoAggregateArgs>(args: Subset<T, AlunoAggregateArgs>): Prisma.PrismaPromise<GetAlunoAggregateType<T>>

    /**
     * Group by Aluno.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlunoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlunoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlunoGroupByArgs['orderBy'] }
        : { orderBy?: AlunoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlunoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlunoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aluno model
   */
  readonly fields: AlunoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aluno.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlunoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    turma<T extends TurmaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TurmaDefaultArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    encarregado<T extends Aluno$encarregadoArgs<ExtArgs> = {}>(args?: Subset<T, Aluno$encarregadoArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    notas<T extends Aluno$notasArgs<ExtArgs> = {}>(args?: Subset<T, Aluno$notasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Aluno model
   */ 
  interface AlunoFieldRefs {
    readonly id: FieldRef<"Aluno", 'Int'>
    readonly nome: FieldRef<"Aluno", 'String'>
    readonly matricula: FieldRef<"Aluno", 'String'>
    readonly telefone: FieldRef<"Aluno", 'String'>
    readonly email: FieldRef<"Aluno", 'String'>
    readonly imagem: FieldRef<"Aluno", 'String'>
    readonly classe: FieldRef<"Aluno", 'String'>
    readonly dataNascimento: FieldRef<"Aluno", 'DateTime'>
    readonly endereco: FieldRef<"Aluno", 'String'>
    readonly turmaId: FieldRef<"Aluno", 'Int'>
    readonly encarregadoId: FieldRef<"Aluno", 'Int'>
    readonly cursoId: FieldRef<"Aluno", 'Int'>
    readonly criadoEm: FieldRef<"Aluno", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Aluno", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Aluno findUnique
   */
  export type AlunoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter, which Aluno to fetch.
     */
    where: AlunoWhereUniqueInput
  }

  /**
   * Aluno findUniqueOrThrow
   */
  export type AlunoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter, which Aluno to fetch.
     */
    where: AlunoWhereUniqueInput
  }

  /**
   * Aluno findFirst
   */
  export type AlunoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter, which Aluno to fetch.
     */
    where?: AlunoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alunos to fetch.
     */
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alunos.
     */
    cursor?: AlunoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alunos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alunos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alunos.
     */
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Aluno findFirstOrThrow
   */
  export type AlunoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter, which Aluno to fetch.
     */
    where?: AlunoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alunos to fetch.
     */
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alunos.
     */
    cursor?: AlunoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alunos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alunos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alunos.
     */
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Aluno findMany
   */
  export type AlunoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter, which Alunos to fetch.
     */
    where?: AlunoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alunos to fetch.
     */
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alunos.
     */
    cursor?: AlunoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alunos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alunos.
     */
    skip?: number
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Aluno create
   */
  export type AlunoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * The data needed to create a Aluno.
     */
    data: XOR<AlunoCreateInput, AlunoUncheckedCreateInput>
  }

  /**
   * Aluno createMany
   */
  export type AlunoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alunos.
     */
    data: AlunoCreateManyInput | AlunoCreateManyInput[]
  }

  /**
   * Aluno createManyAndReturn
   */
  export type AlunoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Alunos.
     */
    data: AlunoCreateManyInput | AlunoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Aluno update
   */
  export type AlunoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * The data needed to update a Aluno.
     */
    data: XOR<AlunoUpdateInput, AlunoUncheckedUpdateInput>
    /**
     * Choose, which Aluno to update.
     */
    where: AlunoWhereUniqueInput
  }

  /**
   * Aluno updateMany
   */
  export type AlunoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alunos.
     */
    data: XOR<AlunoUpdateManyMutationInput, AlunoUncheckedUpdateManyInput>
    /**
     * Filter which Alunos to update
     */
    where?: AlunoWhereInput
  }

  /**
   * Aluno upsert
   */
  export type AlunoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * The filter to search for the Aluno to update in case it exists.
     */
    where: AlunoWhereUniqueInput
    /**
     * In case the Aluno found by the `where` argument doesn't exist, create a new Aluno with this data.
     */
    create: XOR<AlunoCreateInput, AlunoUncheckedCreateInput>
    /**
     * In case the Aluno was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlunoUpdateInput, AlunoUncheckedUpdateInput>
  }

  /**
   * Aluno delete
   */
  export type AlunoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    /**
     * Filter which Aluno to delete.
     */
    where: AlunoWhereUniqueInput
  }

  /**
   * Aluno deleteMany
   */
  export type AlunoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alunos to delete
     */
    where?: AlunoWhereInput
  }

  /**
   * Aluno.encarregado
   */
  export type Aluno$encarregadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Aluno.notas
   */
  export type Aluno$notasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    where?: NotaWhereInput
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    cursor?: NotaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotaScalarFieldEnum | NotaScalarFieldEnum[]
  }

  /**
   * Aluno without action
   */
  export type AlunoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
  }


  /**
   * Model Turma
   */

  export type AggregateTurma = {
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  export type TurmaAvgAggregateOutputType = {
    id: number | null
    ano: number | null
    semestre: number | null
    capacidade: number | null
    professorId: number | null
    cursoId: number | null
  }

  export type TurmaSumAggregateOutputType = {
    id: number | null
    ano: number | null
    semestre: number | null
    capacidade: number | null
    professorId: number | null
    cursoId: number | null
  }

  export type TurmaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    ano: number | null
    semestre: number | null
    capacidade: number | null
    turno: string | null
    professorId: number | null
    cursoId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type TurmaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    ano: number | null
    semestre: number | null
    capacidade: number | null
    turno: string | null
    professorId: number | null
    cursoId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type TurmaCountAggregateOutputType = {
    id: number
    nome: number
    ano: number
    semestre: number
    capacidade: number
    turno: number
    professorId: number
    cursoId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type TurmaAvgAggregateInputType = {
    id?: true
    ano?: true
    semestre?: true
    capacidade?: true
    professorId?: true
    cursoId?: true
  }

  export type TurmaSumAggregateInputType = {
    id?: true
    ano?: true
    semestre?: true
    capacidade?: true
    professorId?: true
    cursoId?: true
  }

  export type TurmaMinAggregateInputType = {
    id?: true
    nome?: true
    ano?: true
    semestre?: true
    capacidade?: true
    turno?: true
    professorId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type TurmaMaxAggregateInputType = {
    id?: true
    nome?: true
    ano?: true
    semestre?: true
    capacidade?: true
    turno?: true
    professorId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type TurmaCountAggregateInputType = {
    id?: true
    nome?: true
    ano?: true
    semestre?: true
    capacidade?: true
    turno?: true
    professorId?: true
    cursoId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type TurmaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turma to aggregate.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Turmas
    **/
    _count?: true | TurmaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TurmaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TurmaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TurmaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TurmaMaxAggregateInputType
  }

  export type GetTurmaAggregateType<T extends TurmaAggregateArgs> = {
        [P in keyof T & keyof AggregateTurma]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTurma[P]>
      : GetScalarType<T[P], AggregateTurma[P]>
  }




  export type TurmaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithAggregationInput | TurmaOrderByWithAggregationInput[]
    by: TurmaScalarFieldEnum[] | TurmaScalarFieldEnum
    having?: TurmaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TurmaCountAggregateInputType | true
    _avg?: TurmaAvgAggregateInputType
    _sum?: TurmaSumAggregateInputType
    _min?: TurmaMinAggregateInputType
    _max?: TurmaMaxAggregateInputType
  }

  export type TurmaGroupByOutputType = {
    id: number
    nome: string
    ano: number
    semestre: number | null
    capacidade: number | null
    turno: string | null
    professorId: number | null
    cursoId: number | null
    criadoEm: Date
    atualizadoEm: Date
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  type GetTurmaGroupByPayload<T extends TurmaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TurmaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TurmaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TurmaGroupByOutputType[P]>
            : GetScalarType<T[P], TurmaGroupByOutputType[P]>
        }
      >
    >


  export type TurmaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    ano?: boolean
    semestre?: boolean
    capacidade?: boolean
    turno?: boolean
    professorId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    professor?: boolean | Turma$professorArgs<ExtArgs>
    curso?: boolean | Turma$cursoArgs<ExtArgs>
    alunos?: boolean | Turma$alunosArgs<ExtArgs>
    disciplinas?: boolean | Turma$disciplinasArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    ano?: boolean
    semestre?: boolean
    capacidade?: boolean
    turno?: boolean
    professorId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    professor?: boolean | Turma$professorArgs<ExtArgs>
    curso?: boolean | Turma$cursoArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectScalar = {
    id?: boolean
    nome?: boolean
    ano?: boolean
    semestre?: boolean
    capacidade?: boolean
    turno?: boolean
    professorId?: boolean
    cursoId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type TurmaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | Turma$professorArgs<ExtArgs>
    curso?: boolean | Turma$cursoArgs<ExtArgs>
    alunos?: boolean | Turma$alunosArgs<ExtArgs>
    disciplinas?: boolean | Turma$disciplinasArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TurmaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | Turma$professorArgs<ExtArgs>
    curso?: boolean | Turma$cursoArgs<ExtArgs>
  }

  export type $TurmaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Turma"
    objects: {
      professor: Prisma.$UsuarioPayload<ExtArgs> | null
      curso: Prisma.$CursoPayload<ExtArgs> | null
      alunos: Prisma.$AlunoPayload<ExtArgs>[]
      disciplinas: Prisma.$DisciplinaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      ano: number
      semestre: number | null
      capacidade: number | null
      turno: string | null
      professorId: number | null
      cursoId: number | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["turma"]>
    composites: {}
  }

  type TurmaGetPayload<S extends boolean | null | undefined | TurmaDefaultArgs> = $Result.GetResult<Prisma.$TurmaPayload, S>

  type TurmaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TurmaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TurmaCountAggregateInputType | true
    }

  export interface TurmaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Turma'], meta: { name: 'Turma' } }
    /**
     * Find zero or one Turma that matches the filter.
     * @param {TurmaFindUniqueArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TurmaFindUniqueArgs>(args: SelectSubset<T, TurmaFindUniqueArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Turma that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TurmaFindUniqueOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TurmaFindUniqueOrThrowArgs>(args: SelectSubset<T, TurmaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Turma that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TurmaFindFirstArgs>(args?: SelectSubset<T, TurmaFindFirstArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Turma that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TurmaFindFirstOrThrowArgs>(args?: SelectSubset<T, TurmaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Turmas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Turmas
     * const turmas = await prisma.turma.findMany()
     * 
     * // Get first 10 Turmas
     * const turmas = await prisma.turma.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const turmaWithIdOnly = await prisma.turma.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TurmaFindManyArgs>(args?: SelectSubset<T, TurmaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Turma.
     * @param {TurmaCreateArgs} args - Arguments to create a Turma.
     * @example
     * // Create one Turma
     * const Turma = await prisma.turma.create({
     *   data: {
     *     // ... data to create a Turma
     *   }
     * })
     * 
     */
    create<T extends TurmaCreateArgs>(args: SelectSubset<T, TurmaCreateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Turmas.
     * @param {TurmaCreateManyArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TurmaCreateManyArgs>(args?: SelectSubset<T, TurmaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Turmas and returns the data saved in the database.
     * @param {TurmaCreateManyAndReturnArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Turmas and only return the `id`
     * const turmaWithIdOnly = await prisma.turma.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TurmaCreateManyAndReturnArgs>(args?: SelectSubset<T, TurmaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Turma.
     * @param {TurmaDeleteArgs} args - Arguments to delete one Turma.
     * @example
     * // Delete one Turma
     * const Turma = await prisma.turma.delete({
     *   where: {
     *     // ... filter to delete one Turma
     *   }
     * })
     * 
     */
    delete<T extends TurmaDeleteArgs>(args: SelectSubset<T, TurmaDeleteArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Turma.
     * @param {TurmaUpdateArgs} args - Arguments to update one Turma.
     * @example
     * // Update one Turma
     * const turma = await prisma.turma.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TurmaUpdateArgs>(args: SelectSubset<T, TurmaUpdateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Turmas.
     * @param {TurmaDeleteManyArgs} args - Arguments to filter Turmas to delete.
     * @example
     * // Delete a few Turmas
     * const { count } = await prisma.turma.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TurmaDeleteManyArgs>(args?: SelectSubset<T, TurmaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Turmas
     * const turma = await prisma.turma.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TurmaUpdateManyArgs>(args: SelectSubset<T, TurmaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Turma.
     * @param {TurmaUpsertArgs} args - Arguments to update or create a Turma.
     * @example
     * // Update or create a Turma
     * const turma = await prisma.turma.upsert({
     *   create: {
     *     // ... data to create a Turma
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Turma we want to update
     *   }
     * })
     */
    upsert<T extends TurmaUpsertArgs>(args: SelectSubset<T, TurmaUpsertArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaCountArgs} args - Arguments to filter Turmas to count.
     * @example
     * // Count the number of Turmas
     * const count = await prisma.turma.count({
     *   where: {
     *     // ... the filter for the Turmas we want to count
     *   }
     * })
    **/
    count<T extends TurmaCountArgs>(
      args?: Subset<T, TurmaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TurmaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TurmaAggregateArgs>(args: Subset<T, TurmaAggregateArgs>): Prisma.PrismaPromise<GetTurmaAggregateType<T>>

    /**
     * Group by Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TurmaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TurmaGroupByArgs['orderBy'] }
        : { orderBy?: TurmaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TurmaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTurmaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Turma model
   */
  readonly fields: TurmaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Turma.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TurmaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professor<T extends Turma$professorArgs<ExtArgs> = {}>(args?: Subset<T, Turma$professorArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    curso<T extends Turma$cursoArgs<ExtArgs> = {}>(args?: Subset<T, Turma$cursoArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    alunos<T extends Turma$alunosArgs<ExtArgs> = {}>(args?: Subset<T, Turma$alunosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findMany"> | Null>
    disciplinas<T extends Turma$disciplinasArgs<ExtArgs> = {}>(args?: Subset<T, Turma$disciplinasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Turma model
   */ 
  interface TurmaFieldRefs {
    readonly id: FieldRef<"Turma", 'Int'>
    readonly nome: FieldRef<"Turma", 'String'>
    readonly ano: FieldRef<"Turma", 'Int'>
    readonly semestre: FieldRef<"Turma", 'Int'>
    readonly capacidade: FieldRef<"Turma", 'Int'>
    readonly turno: FieldRef<"Turma", 'String'>
    readonly professorId: FieldRef<"Turma", 'Int'>
    readonly cursoId: FieldRef<"Turma", 'Int'>
    readonly criadoEm: FieldRef<"Turma", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Turma", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Turma findUnique
   */
  export type TurmaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findUniqueOrThrow
   */
  export type TurmaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findFirst
   */
  export type TurmaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findFirstOrThrow
   */
  export type TurmaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findMany
   */
  export type TurmaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turmas to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma create
   */
  export type TurmaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to create a Turma.
     */
    data: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
  }

  /**
   * Turma createMany
   */
  export type TurmaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
  }

  /**
   * Turma createManyAndReturn
   */
  export type TurmaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Turma update
   */
  export type TurmaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to update a Turma.
     */
    data: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
    /**
     * Choose, which Turma to update.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma updateMany
   */
  export type TurmaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Turmas.
     */
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyInput>
    /**
     * Filter which Turmas to update
     */
    where?: TurmaWhereInput
  }

  /**
   * Turma upsert
   */
  export type TurmaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The filter to search for the Turma to update in case it exists.
     */
    where: TurmaWhereUniqueInput
    /**
     * In case the Turma found by the `where` argument doesn't exist, create a new Turma with this data.
     */
    create: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
    /**
     * In case the Turma was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
  }

  /**
   * Turma delete
   */
  export type TurmaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter which Turma to delete.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma deleteMany
   */
  export type TurmaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turmas to delete
     */
    where?: TurmaWhereInput
  }

  /**
   * Turma.professor
   */
  export type Turma$professorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Turma.curso
   */
  export type Turma$cursoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    where?: CursoWhereInput
  }

  /**
   * Turma.alunos
   */
  export type Turma$alunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    where?: AlunoWhereInput
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    cursor?: AlunoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Turma.disciplinas
   */
  export type Turma$disciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    where?: DisciplinaWhereInput
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    cursor?: DisciplinaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Turma without action
   */
  export type TurmaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
  }


  /**
   * Model Curso
   */

  export type AggregateCurso = {
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  export type CursoAvgAggregateOutputType = {
    id: number | null
    cargaHoraria: number | null
    duracaoMeses: number | null
  }

  export type CursoSumAggregateOutputType = {
    id: number | null
    cargaHoraria: number | null
    duracaoMeses: number | null
  }

  export type CursoMinAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    cargaHoraria: number | null
    duracaoMeses: number | null
    nivel: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CursoMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    descricao: string | null
    cargaHoraria: number | null
    duracaoMeses: number | null
    nivel: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CursoCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    cargaHoraria: number
    duracaoMeses: number
    nivel: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CursoAvgAggregateInputType = {
    id?: true
    cargaHoraria?: true
    duracaoMeses?: true
  }

  export type CursoSumAggregateInputType = {
    id?: true
    cargaHoraria?: true
    duracaoMeses?: true
  }

  export type CursoMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cargaHoraria?: true
    duracaoMeses?: true
    nivel?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CursoMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cargaHoraria?: true
    duracaoMeses?: true
    nivel?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CursoCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    cargaHoraria?: true
    duracaoMeses?: true
    nivel?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CursoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Curso to aggregate.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cursos
    **/
    _count?: true | CursoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CursoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CursoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CursoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CursoMaxAggregateInputType
  }

  export type GetCursoAggregateType<T extends CursoAggregateArgs> = {
        [P in keyof T & keyof AggregateCurso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurso[P]>
      : GetScalarType<T[P], AggregateCurso[P]>
  }




  export type CursoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CursoWhereInput
    orderBy?: CursoOrderByWithAggregationInput | CursoOrderByWithAggregationInput[]
    by: CursoScalarFieldEnum[] | CursoScalarFieldEnum
    having?: CursoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CursoCountAggregateInputType | true
    _avg?: CursoAvgAggregateInputType
    _sum?: CursoSumAggregateInputType
    _min?: CursoMinAggregateInputType
    _max?: CursoMaxAggregateInputType
  }

  export type CursoGroupByOutputType = {
    id: number
    nome: string
    descricao: string
    cargaHoraria: number | null
    duracaoMeses: number | null
    nivel: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: CursoCountAggregateOutputType | null
    _avg: CursoAvgAggregateOutputType | null
    _sum: CursoSumAggregateOutputType | null
    _min: CursoMinAggregateOutputType | null
    _max: CursoMaxAggregateOutputType | null
  }

  type GetCursoGroupByPayload<T extends CursoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CursoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CursoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CursoGroupByOutputType[P]>
            : GetScalarType<T[P], CursoGroupByOutputType[P]>
        }
      >
    >


  export type CursoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    duracaoMeses?: boolean
    nivel?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    disciplinas?: boolean | Curso$disciplinasArgs<ExtArgs>
    alunos?: boolean | Curso$alunosArgs<ExtArgs>
    turmas?: boolean | Curso$turmasArgs<ExtArgs>
    professores?: boolean | Curso$professoresArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    duracaoMeses?: boolean
    nivel?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["curso"]>

  export type CursoSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    duracaoMeses?: boolean
    nivel?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CursoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disciplinas?: boolean | Curso$disciplinasArgs<ExtArgs>
    alunos?: boolean | Curso$alunosArgs<ExtArgs>
    turmas?: boolean | Curso$turmasArgs<ExtArgs>
    professores?: boolean | Curso$professoresArgs<ExtArgs>
    _count?: boolean | CursoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CursoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CursoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Curso"
    objects: {
      disciplinas: Prisma.$DisciplinaPayload<ExtArgs>[]
      alunos: Prisma.$AlunoPayload<ExtArgs>[]
      turmas: Prisma.$TurmaPayload<ExtArgs>[]
      professores: Prisma.$UsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      descricao: string
      cargaHoraria: number | null
      duracaoMeses: number | null
      nivel: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["curso"]>
    composites: {}
  }

  type CursoGetPayload<S extends boolean | null | undefined | CursoDefaultArgs> = $Result.GetResult<Prisma.$CursoPayload, S>

  type CursoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CursoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CursoCountAggregateInputType | true
    }

  export interface CursoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Curso'], meta: { name: 'Curso' } }
    /**
     * Find zero or one Curso that matches the filter.
     * @param {CursoFindUniqueArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CursoFindUniqueArgs>(args: SelectSubset<T, CursoFindUniqueArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Curso that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CursoFindUniqueOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CursoFindUniqueOrThrowArgs>(args: SelectSubset<T, CursoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Curso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CursoFindFirstArgs>(args?: SelectSubset<T, CursoFindFirstArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Curso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindFirstOrThrowArgs} args - Arguments to find a Curso
     * @example
     * // Get one Curso
     * const curso = await prisma.curso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CursoFindFirstOrThrowArgs>(args?: SelectSubset<T, CursoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Cursos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cursos
     * const cursos = await prisma.curso.findMany()
     * 
     * // Get first 10 Cursos
     * const cursos = await prisma.curso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cursoWithIdOnly = await prisma.curso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CursoFindManyArgs>(args?: SelectSubset<T, CursoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Curso.
     * @param {CursoCreateArgs} args - Arguments to create a Curso.
     * @example
     * // Create one Curso
     * const Curso = await prisma.curso.create({
     *   data: {
     *     // ... data to create a Curso
     *   }
     * })
     * 
     */
    create<T extends CursoCreateArgs>(args: SelectSubset<T, CursoCreateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Cursos.
     * @param {CursoCreateManyArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CursoCreateManyArgs>(args?: SelectSubset<T, CursoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cursos and returns the data saved in the database.
     * @param {CursoCreateManyAndReturnArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const curso = await prisma.curso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cursos and only return the `id`
     * const cursoWithIdOnly = await prisma.curso.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CursoCreateManyAndReturnArgs>(args?: SelectSubset<T, CursoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Curso.
     * @param {CursoDeleteArgs} args - Arguments to delete one Curso.
     * @example
     * // Delete one Curso
     * const Curso = await prisma.curso.delete({
     *   where: {
     *     // ... filter to delete one Curso
     *   }
     * })
     * 
     */
    delete<T extends CursoDeleteArgs>(args: SelectSubset<T, CursoDeleteArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Curso.
     * @param {CursoUpdateArgs} args - Arguments to update one Curso.
     * @example
     * // Update one Curso
     * const curso = await prisma.curso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CursoUpdateArgs>(args: SelectSubset<T, CursoUpdateArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Cursos.
     * @param {CursoDeleteManyArgs} args - Arguments to filter Cursos to delete.
     * @example
     * // Delete a few Cursos
     * const { count } = await prisma.curso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CursoDeleteManyArgs>(args?: SelectSubset<T, CursoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cursos
     * const curso = await prisma.curso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CursoUpdateManyArgs>(args: SelectSubset<T, CursoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Curso.
     * @param {CursoUpsertArgs} args - Arguments to update or create a Curso.
     * @example
     * // Update or create a Curso
     * const curso = await prisma.curso.upsert({
     *   create: {
     *     // ... data to create a Curso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Curso we want to update
     *   }
     * })
     */
    upsert<T extends CursoUpsertArgs>(args: SelectSubset<T, CursoUpsertArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoCountArgs} args - Arguments to filter Cursos to count.
     * @example
     * // Count the number of Cursos
     * const count = await prisma.curso.count({
     *   where: {
     *     // ... the filter for the Cursos we want to count
     *   }
     * })
    **/
    count<T extends CursoCountArgs>(
      args?: Subset<T, CursoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CursoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CursoAggregateArgs>(args: Subset<T, CursoAggregateArgs>): Prisma.PrismaPromise<GetCursoAggregateType<T>>

    /**
     * Group by Curso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CursoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CursoGroupByArgs['orderBy'] }
        : { orderBy?: CursoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CursoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCursoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Curso model
   */
  readonly fields: CursoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Curso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CursoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    disciplinas<T extends Curso$disciplinasArgs<ExtArgs> = {}>(args?: Subset<T, Curso$disciplinasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findMany"> | Null>
    alunos<T extends Curso$alunosArgs<ExtArgs> = {}>(args?: Subset<T, Curso$alunosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findMany"> | Null>
    turmas<T extends Curso$turmasArgs<ExtArgs> = {}>(args?: Subset<T, Curso$turmasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany"> | Null>
    professores<T extends Curso$professoresArgs<ExtArgs> = {}>(args?: Subset<T, Curso$professoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Curso model
   */ 
  interface CursoFieldRefs {
    readonly id: FieldRef<"Curso", 'Int'>
    readonly nome: FieldRef<"Curso", 'String'>
    readonly descricao: FieldRef<"Curso", 'String'>
    readonly cargaHoraria: FieldRef<"Curso", 'Int'>
    readonly duracaoMeses: FieldRef<"Curso", 'Int'>
    readonly nivel: FieldRef<"Curso", 'String'>
    readonly criadoEm: FieldRef<"Curso", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Curso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Curso findUnique
   */
  export type CursoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findUniqueOrThrow
   */
  export type CursoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso findFirst
   */
  export type CursoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findFirstOrThrow
   */
  export type CursoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Curso to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cursos.
     */
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso findMany
   */
  export type CursoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter, which Cursos to fetch.
     */
    where?: CursoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cursos to fetch.
     */
    orderBy?: CursoOrderByWithRelationInput | CursoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cursos.
     */
    cursor?: CursoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cursos.
     */
    skip?: number
    distinct?: CursoScalarFieldEnum | CursoScalarFieldEnum[]
  }

  /**
   * Curso create
   */
  export type CursoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to create a Curso.
     */
    data: XOR<CursoCreateInput, CursoUncheckedCreateInput>
  }

  /**
   * Curso createMany
   */
  export type CursoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
  }

  /**
   * Curso createManyAndReturn
   */
  export type CursoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Cursos.
     */
    data: CursoCreateManyInput | CursoCreateManyInput[]
  }

  /**
   * Curso update
   */
  export type CursoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The data needed to update a Curso.
     */
    data: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
    /**
     * Choose, which Curso to update.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso updateMany
   */
  export type CursoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cursos.
     */
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyInput>
    /**
     * Filter which Cursos to update
     */
    where?: CursoWhereInput
  }

  /**
   * Curso upsert
   */
  export type CursoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * The filter to search for the Curso to update in case it exists.
     */
    where: CursoWhereUniqueInput
    /**
     * In case the Curso found by the `where` argument doesn't exist, create a new Curso with this data.
     */
    create: XOR<CursoCreateInput, CursoUncheckedCreateInput>
    /**
     * In case the Curso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CursoUpdateInput, CursoUncheckedUpdateInput>
  }

  /**
   * Curso delete
   */
  export type CursoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
    /**
     * Filter which Curso to delete.
     */
    where: CursoWhereUniqueInput
  }

  /**
   * Curso deleteMany
   */
  export type CursoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cursos to delete
     */
    where?: CursoWhereInput
  }

  /**
   * Curso.disciplinas
   */
  export type Curso$disciplinasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    where?: DisciplinaWhereInput
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    cursor?: DisciplinaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Curso.alunos
   */
  export type Curso$alunosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aluno
     */
    select?: AlunoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlunoInclude<ExtArgs> | null
    where?: AlunoWhereInput
    orderBy?: AlunoOrderByWithRelationInput | AlunoOrderByWithRelationInput[]
    cursor?: AlunoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlunoScalarFieldEnum | AlunoScalarFieldEnum[]
  }

  /**
   * Curso.turmas
   */
  export type Curso$turmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    cursor?: TurmaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Curso.professores
   */
  export type Curso$professoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Curso without action
   */
  export type CursoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curso
     */
    select?: CursoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CursoInclude<ExtArgs> | null
  }


  /**
   * Model Disciplina
   */

  export type AggregateDisciplina = {
    _count: DisciplinaCountAggregateOutputType | null
    _avg: DisciplinaAvgAggregateOutputType | null
    _sum: DisciplinaSumAggregateOutputType | null
    _min: DisciplinaMinAggregateOutputType | null
    _max: DisciplinaMaxAggregateOutputType | null
  }

  export type DisciplinaAvgAggregateOutputType = {
    id: number | null
    cargaHoraria: number | null
    semestre: number | null
    cursoId: number | null
    professorId: number | null
  }

  export type DisciplinaSumAggregateOutputType = {
    id: number | null
    cargaHoraria: number | null
    semestre: number | null
    cursoId: number | null
    professorId: number | null
  }

  export type DisciplinaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    codigo: string | null
    descricao: string | null
    cargaHoraria: number | null
    semestre: number | null
    cursoId: number | null
    professorId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type DisciplinaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    codigo: string | null
    descricao: string | null
    cargaHoraria: number | null
    semestre: number | null
    cursoId: number | null
    professorId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type DisciplinaCountAggregateOutputType = {
    id: number
    nome: number
    codigo: number
    descricao: number
    cargaHoraria: number
    semestre: number
    cursoId: number
    professorId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type DisciplinaAvgAggregateInputType = {
    id?: true
    cargaHoraria?: true
    semestre?: true
    cursoId?: true
    professorId?: true
  }

  export type DisciplinaSumAggregateInputType = {
    id?: true
    cargaHoraria?: true
    semestre?: true
    cursoId?: true
    professorId?: true
  }

  export type DisciplinaMinAggregateInputType = {
    id?: true
    nome?: true
    codigo?: true
    descricao?: true
    cargaHoraria?: true
    semestre?: true
    cursoId?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type DisciplinaMaxAggregateInputType = {
    id?: true
    nome?: true
    codigo?: true
    descricao?: true
    cargaHoraria?: true
    semestre?: true
    cursoId?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type DisciplinaCountAggregateInputType = {
    id?: true
    nome?: true
    codigo?: true
    descricao?: true
    cargaHoraria?: true
    semestre?: true
    cursoId?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type DisciplinaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disciplina to aggregate.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disciplinas
    **/
    _count?: true | DisciplinaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisciplinaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisciplinaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisciplinaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisciplinaMaxAggregateInputType
  }

  export type GetDisciplinaAggregateType<T extends DisciplinaAggregateArgs> = {
        [P in keyof T & keyof AggregateDisciplina]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisciplina[P]>
      : GetScalarType<T[P], AggregateDisciplina[P]>
  }




  export type DisciplinaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaWhereInput
    orderBy?: DisciplinaOrderByWithAggregationInput | DisciplinaOrderByWithAggregationInput[]
    by: DisciplinaScalarFieldEnum[] | DisciplinaScalarFieldEnum
    having?: DisciplinaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisciplinaCountAggregateInputType | true
    _avg?: DisciplinaAvgAggregateInputType
    _sum?: DisciplinaSumAggregateInputType
    _min?: DisciplinaMinAggregateInputType
    _max?: DisciplinaMaxAggregateInputType
  }

  export type DisciplinaGroupByOutputType = {
    id: number
    nome: string
    codigo: string | null
    descricao: string
    cargaHoraria: number | null
    semestre: number | null
    cursoId: number
    professorId: number | null
    criadoEm: Date
    atualizadoEm: Date
    _count: DisciplinaCountAggregateOutputType | null
    _avg: DisciplinaAvgAggregateOutputType | null
    _sum: DisciplinaSumAggregateOutputType | null
    _min: DisciplinaMinAggregateOutputType | null
    _max: DisciplinaMaxAggregateOutputType | null
  }

  type GetDisciplinaGroupByPayload<T extends DisciplinaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisciplinaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisciplinaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisciplinaGroupByOutputType[P]>
            : GetScalarType<T[P], DisciplinaGroupByOutputType[P]>
        }
      >
    >


  export type DisciplinaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    codigo?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    semestre?: boolean
    cursoId?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    professor?: boolean | Disciplina$professorArgs<ExtArgs>
    notas?: boolean | Disciplina$notasArgs<ExtArgs>
    turmas?: boolean | Disciplina$turmasArgs<ExtArgs>
    _count?: boolean | DisciplinaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disciplina"]>

  export type DisciplinaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    codigo?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    semestre?: boolean
    cursoId?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    professor?: boolean | Disciplina$professorArgs<ExtArgs>
  }, ExtArgs["result"]["disciplina"]>

  export type DisciplinaSelectScalar = {
    id?: boolean
    nome?: boolean
    codigo?: boolean
    descricao?: boolean
    cargaHoraria?: boolean
    semestre?: boolean
    cursoId?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type DisciplinaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    professor?: boolean | Disciplina$professorArgs<ExtArgs>
    notas?: boolean | Disciplina$notasArgs<ExtArgs>
    turmas?: boolean | Disciplina$turmasArgs<ExtArgs>
    _count?: boolean | DisciplinaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DisciplinaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curso?: boolean | CursoDefaultArgs<ExtArgs>
    professor?: boolean | Disciplina$professorArgs<ExtArgs>
  }

  export type $DisciplinaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Disciplina"
    objects: {
      curso: Prisma.$CursoPayload<ExtArgs>
      professor: Prisma.$UsuarioPayload<ExtArgs> | null
      notas: Prisma.$NotaPayload<ExtArgs>[]
      turmas: Prisma.$TurmaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      codigo: string | null
      descricao: string
      cargaHoraria: number | null
      semestre: number | null
      cursoId: number
      professorId: number | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["disciplina"]>
    composites: {}
  }

  type DisciplinaGetPayload<S extends boolean | null | undefined | DisciplinaDefaultArgs> = $Result.GetResult<Prisma.$DisciplinaPayload, S>

  type DisciplinaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DisciplinaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DisciplinaCountAggregateInputType | true
    }

  export interface DisciplinaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Disciplina'], meta: { name: 'Disciplina' } }
    /**
     * Find zero or one Disciplina that matches the filter.
     * @param {DisciplinaFindUniqueArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisciplinaFindUniqueArgs>(args: SelectSubset<T, DisciplinaFindUniqueArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Disciplina that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DisciplinaFindUniqueOrThrowArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisciplinaFindUniqueOrThrowArgs>(args: SelectSubset<T, DisciplinaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Disciplina that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindFirstArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisciplinaFindFirstArgs>(args?: SelectSubset<T, DisciplinaFindFirstArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Disciplina that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindFirstOrThrowArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisciplinaFindFirstOrThrowArgs>(args?: SelectSubset<T, DisciplinaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Disciplinas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disciplinas
     * const disciplinas = await prisma.disciplina.findMany()
     * 
     * // Get first 10 Disciplinas
     * const disciplinas = await prisma.disciplina.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disciplinaWithIdOnly = await prisma.disciplina.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisciplinaFindManyArgs>(args?: SelectSubset<T, DisciplinaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Disciplina.
     * @param {DisciplinaCreateArgs} args - Arguments to create a Disciplina.
     * @example
     * // Create one Disciplina
     * const Disciplina = await prisma.disciplina.create({
     *   data: {
     *     // ... data to create a Disciplina
     *   }
     * })
     * 
     */
    create<T extends DisciplinaCreateArgs>(args: SelectSubset<T, DisciplinaCreateArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Disciplinas.
     * @param {DisciplinaCreateManyArgs} args - Arguments to create many Disciplinas.
     * @example
     * // Create many Disciplinas
     * const disciplina = await prisma.disciplina.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisciplinaCreateManyArgs>(args?: SelectSubset<T, DisciplinaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disciplinas and returns the data saved in the database.
     * @param {DisciplinaCreateManyAndReturnArgs} args - Arguments to create many Disciplinas.
     * @example
     * // Create many Disciplinas
     * const disciplina = await prisma.disciplina.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disciplinas and only return the `id`
     * const disciplinaWithIdOnly = await prisma.disciplina.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisciplinaCreateManyAndReturnArgs>(args?: SelectSubset<T, DisciplinaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Disciplina.
     * @param {DisciplinaDeleteArgs} args - Arguments to delete one Disciplina.
     * @example
     * // Delete one Disciplina
     * const Disciplina = await prisma.disciplina.delete({
     *   where: {
     *     // ... filter to delete one Disciplina
     *   }
     * })
     * 
     */
    delete<T extends DisciplinaDeleteArgs>(args: SelectSubset<T, DisciplinaDeleteArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Disciplina.
     * @param {DisciplinaUpdateArgs} args - Arguments to update one Disciplina.
     * @example
     * // Update one Disciplina
     * const disciplina = await prisma.disciplina.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisciplinaUpdateArgs>(args: SelectSubset<T, DisciplinaUpdateArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Disciplinas.
     * @param {DisciplinaDeleteManyArgs} args - Arguments to filter Disciplinas to delete.
     * @example
     * // Delete a few Disciplinas
     * const { count } = await prisma.disciplina.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisciplinaDeleteManyArgs>(args?: SelectSubset<T, DisciplinaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disciplinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disciplinas
     * const disciplina = await prisma.disciplina.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisciplinaUpdateManyArgs>(args: SelectSubset<T, DisciplinaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Disciplina.
     * @param {DisciplinaUpsertArgs} args - Arguments to update or create a Disciplina.
     * @example
     * // Update or create a Disciplina
     * const disciplina = await prisma.disciplina.upsert({
     *   create: {
     *     // ... data to create a Disciplina
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disciplina we want to update
     *   }
     * })
     */
    upsert<T extends DisciplinaUpsertArgs>(args: SelectSubset<T, DisciplinaUpsertArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Disciplinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaCountArgs} args - Arguments to filter Disciplinas to count.
     * @example
     * // Count the number of Disciplinas
     * const count = await prisma.disciplina.count({
     *   where: {
     *     // ... the filter for the Disciplinas we want to count
     *   }
     * })
    **/
    count<T extends DisciplinaCountArgs>(
      args?: Subset<T, DisciplinaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisciplinaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disciplina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisciplinaAggregateArgs>(args: Subset<T, DisciplinaAggregateArgs>): Prisma.PrismaPromise<GetDisciplinaAggregateType<T>>

    /**
     * Group by Disciplina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisciplinaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisciplinaGroupByArgs['orderBy'] }
        : { orderBy?: DisciplinaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisciplinaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Disciplina model
   */
  readonly fields: DisciplinaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Disciplina.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisciplinaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curso<T extends CursoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CursoDefaultArgs<ExtArgs>>): Prisma__CursoClient<$Result.GetResult<Prisma.$CursoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    professor<T extends Disciplina$professorArgs<ExtArgs> = {}>(args?: Subset<T, Disciplina$professorArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    notas<T extends Disciplina$notasArgs<ExtArgs> = {}>(args?: Subset<T, Disciplina$notasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findMany"> | Null>
    turmas<T extends Disciplina$turmasArgs<ExtArgs> = {}>(args?: Subset<T, Disciplina$turmasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Disciplina model
   */ 
  interface DisciplinaFieldRefs {
    readonly id: FieldRef<"Disciplina", 'Int'>
    readonly nome: FieldRef<"Disciplina", 'String'>
    readonly codigo: FieldRef<"Disciplina", 'String'>
    readonly descricao: FieldRef<"Disciplina", 'String'>
    readonly cargaHoraria: FieldRef<"Disciplina", 'Int'>
    readonly semestre: FieldRef<"Disciplina", 'Int'>
    readonly cursoId: FieldRef<"Disciplina", 'Int'>
    readonly professorId: FieldRef<"Disciplina", 'Int'>
    readonly criadoEm: FieldRef<"Disciplina", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Disciplina", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Disciplina findUnique
   */
  export type DisciplinaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina findUniqueOrThrow
   */
  export type DisciplinaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina findFirst
   */
  export type DisciplinaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplinas.
     */
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina findFirstOrThrow
   */
  export type DisciplinaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplinas.
     */
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina findMany
   */
  export type DisciplinaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplinas to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina create
   */
  export type DisciplinaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The data needed to create a Disciplina.
     */
    data: XOR<DisciplinaCreateInput, DisciplinaUncheckedCreateInput>
  }

  /**
   * Disciplina createMany
   */
  export type DisciplinaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disciplinas.
     */
    data: DisciplinaCreateManyInput | DisciplinaCreateManyInput[]
  }

  /**
   * Disciplina createManyAndReturn
   */
  export type DisciplinaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Disciplinas.
     */
    data: DisciplinaCreateManyInput | DisciplinaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disciplina update
   */
  export type DisciplinaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The data needed to update a Disciplina.
     */
    data: XOR<DisciplinaUpdateInput, DisciplinaUncheckedUpdateInput>
    /**
     * Choose, which Disciplina to update.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina updateMany
   */
  export type DisciplinaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disciplinas.
     */
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyInput>
    /**
     * Filter which Disciplinas to update
     */
    where?: DisciplinaWhereInput
  }

  /**
   * Disciplina upsert
   */
  export type DisciplinaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The filter to search for the Disciplina to update in case it exists.
     */
    where: DisciplinaWhereUniqueInput
    /**
     * In case the Disciplina found by the `where` argument doesn't exist, create a new Disciplina with this data.
     */
    create: XOR<DisciplinaCreateInput, DisciplinaUncheckedCreateInput>
    /**
     * In case the Disciplina was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisciplinaUpdateInput, DisciplinaUncheckedUpdateInput>
  }

  /**
   * Disciplina delete
   */
  export type DisciplinaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter which Disciplina to delete.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina deleteMany
   */
  export type DisciplinaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disciplinas to delete
     */
    where?: DisciplinaWhereInput
  }

  /**
   * Disciplina.professor
   */
  export type Disciplina$professorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Disciplina.notas
   */
  export type Disciplina$notasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    where?: NotaWhereInput
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    cursor?: NotaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotaScalarFieldEnum | NotaScalarFieldEnum[]
  }

  /**
   * Disciplina.turmas
   */
  export type Disciplina$turmasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    cursor?: TurmaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Disciplina without action
   */
  export type DisciplinaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
  }


  /**
   * Model Nota
   */

  export type AggregateNota = {
    _count: NotaCountAggregateOutputType | null
    _avg: NotaAvgAggregateOutputType | null
    _sum: NotaSumAggregateOutputType | null
    _min: NotaMinAggregateOutputType | null
    _max: NotaMaxAggregateOutputType | null
  }

  export type NotaAvgAggregateOutputType = {
    id: number | null
    valor: number | null
    alunoId: number | null
    disciplinaId: number | null
    semestre: number | null
  }

  export type NotaSumAggregateOutputType = {
    id: number | null
    valor: number | null
    alunoId: number | null
    disciplinaId: number | null
    semestre: number | null
  }

  export type NotaMinAggregateOutputType = {
    id: number | null
    valor: number | null
    tipo: string | null
    alunoId: number | null
    disciplinaId: number | null
    semestre: number | null
    observacao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type NotaMaxAggregateOutputType = {
    id: number | null
    valor: number | null
    tipo: string | null
    alunoId: number | null
    disciplinaId: number | null
    semestre: number | null
    observacao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type NotaCountAggregateOutputType = {
    id: number
    valor: number
    tipo: number
    alunoId: number
    disciplinaId: number
    semestre: number
    observacao: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type NotaAvgAggregateInputType = {
    id?: true
    valor?: true
    alunoId?: true
    disciplinaId?: true
    semestre?: true
  }

  export type NotaSumAggregateInputType = {
    id?: true
    valor?: true
    alunoId?: true
    disciplinaId?: true
    semestre?: true
  }

  export type NotaMinAggregateInputType = {
    id?: true
    valor?: true
    tipo?: true
    alunoId?: true
    disciplinaId?: true
    semestre?: true
    observacao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type NotaMaxAggregateInputType = {
    id?: true
    valor?: true
    tipo?: true
    alunoId?: true
    disciplinaId?: true
    semestre?: true
    observacao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type NotaCountAggregateInputType = {
    id?: true
    valor?: true
    tipo?: true
    alunoId?: true
    disciplinaId?: true
    semestre?: true
    observacao?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type NotaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nota to aggregate.
     */
    where?: NotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notas to fetch.
     */
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notas
    **/
    _count?: true | NotaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotaMaxAggregateInputType
  }

  export type GetNotaAggregateType<T extends NotaAggregateArgs> = {
        [P in keyof T & keyof AggregateNota]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNota[P]>
      : GetScalarType<T[P], AggregateNota[P]>
  }




  export type NotaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotaWhereInput
    orderBy?: NotaOrderByWithAggregationInput | NotaOrderByWithAggregationInput[]
    by: NotaScalarFieldEnum[] | NotaScalarFieldEnum
    having?: NotaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotaCountAggregateInputType | true
    _avg?: NotaAvgAggregateInputType
    _sum?: NotaSumAggregateInputType
    _min?: NotaMinAggregateInputType
    _max?: NotaMaxAggregateInputType
  }

  export type NotaGroupByOutputType = {
    id: number
    valor: number
    tipo: string
    alunoId: number
    disciplinaId: number
    semestre: number
    observacao: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: NotaCountAggregateOutputType | null
    _avg: NotaAvgAggregateOutputType | null
    _sum: NotaSumAggregateOutputType | null
    _min: NotaMinAggregateOutputType | null
    _max: NotaMaxAggregateOutputType | null
  }

  type GetNotaGroupByPayload<T extends NotaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotaGroupByOutputType[P]>
            : GetScalarType<T[P], NotaGroupByOutputType[P]>
        }
      >
    >


  export type NotaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valor?: boolean
    tipo?: boolean
    alunoId?: boolean
    disciplinaId?: boolean
    semestre?: boolean
    observacao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    aluno?: boolean | AlunoDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nota"]>

  export type NotaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valor?: boolean
    tipo?: boolean
    alunoId?: boolean
    disciplinaId?: boolean
    semestre?: boolean
    observacao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    aluno?: boolean | AlunoDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nota"]>

  export type NotaSelectScalar = {
    id?: boolean
    valor?: boolean
    tipo?: boolean
    alunoId?: boolean
    disciplinaId?: boolean
    semestre?: boolean
    observacao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type NotaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aluno?: boolean | AlunoDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
  }
  export type NotaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aluno?: boolean | AlunoDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
  }

  export type $NotaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Nota"
    objects: {
      aluno: Prisma.$AlunoPayload<ExtArgs>
      disciplina: Prisma.$DisciplinaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      valor: number
      tipo: string
      alunoId: number
      disciplinaId: number
      semestre: number
      observacao: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["nota"]>
    composites: {}
  }

  type NotaGetPayload<S extends boolean | null | undefined | NotaDefaultArgs> = $Result.GetResult<Prisma.$NotaPayload, S>

  type NotaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotaCountAggregateInputType | true
    }

  export interface NotaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Nota'], meta: { name: 'Nota' } }
    /**
     * Find zero or one Nota that matches the filter.
     * @param {NotaFindUniqueArgs} args - Arguments to find a Nota
     * @example
     * // Get one Nota
     * const nota = await prisma.nota.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotaFindUniqueArgs>(args: SelectSubset<T, NotaFindUniqueArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Nota that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotaFindUniqueOrThrowArgs} args - Arguments to find a Nota
     * @example
     * // Get one Nota
     * const nota = await prisma.nota.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotaFindUniqueOrThrowArgs>(args: SelectSubset<T, NotaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Nota that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaFindFirstArgs} args - Arguments to find a Nota
     * @example
     * // Get one Nota
     * const nota = await prisma.nota.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotaFindFirstArgs>(args?: SelectSubset<T, NotaFindFirstArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Nota that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaFindFirstOrThrowArgs} args - Arguments to find a Nota
     * @example
     * // Get one Nota
     * const nota = await prisma.nota.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotaFindFirstOrThrowArgs>(args?: SelectSubset<T, NotaFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notas
     * const notas = await prisma.nota.findMany()
     * 
     * // Get first 10 Notas
     * const notas = await prisma.nota.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notaWithIdOnly = await prisma.nota.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotaFindManyArgs>(args?: SelectSubset<T, NotaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Nota.
     * @param {NotaCreateArgs} args - Arguments to create a Nota.
     * @example
     * // Create one Nota
     * const Nota = await prisma.nota.create({
     *   data: {
     *     // ... data to create a Nota
     *   }
     * })
     * 
     */
    create<T extends NotaCreateArgs>(args: SelectSubset<T, NotaCreateArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notas.
     * @param {NotaCreateManyArgs} args - Arguments to create many Notas.
     * @example
     * // Create many Notas
     * const nota = await prisma.nota.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotaCreateManyArgs>(args?: SelectSubset<T, NotaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notas and returns the data saved in the database.
     * @param {NotaCreateManyAndReturnArgs} args - Arguments to create many Notas.
     * @example
     * // Create many Notas
     * const nota = await prisma.nota.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notas and only return the `id`
     * const notaWithIdOnly = await prisma.nota.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotaCreateManyAndReturnArgs>(args?: SelectSubset<T, NotaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Nota.
     * @param {NotaDeleteArgs} args - Arguments to delete one Nota.
     * @example
     * // Delete one Nota
     * const Nota = await prisma.nota.delete({
     *   where: {
     *     // ... filter to delete one Nota
     *   }
     * })
     * 
     */
    delete<T extends NotaDeleteArgs>(args: SelectSubset<T, NotaDeleteArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Nota.
     * @param {NotaUpdateArgs} args - Arguments to update one Nota.
     * @example
     * // Update one Nota
     * const nota = await prisma.nota.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotaUpdateArgs>(args: SelectSubset<T, NotaUpdateArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notas.
     * @param {NotaDeleteManyArgs} args - Arguments to filter Notas to delete.
     * @example
     * // Delete a few Notas
     * const { count } = await prisma.nota.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotaDeleteManyArgs>(args?: SelectSubset<T, NotaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notas
     * const nota = await prisma.nota.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotaUpdateManyArgs>(args: SelectSubset<T, NotaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Nota.
     * @param {NotaUpsertArgs} args - Arguments to update or create a Nota.
     * @example
     * // Update or create a Nota
     * const nota = await prisma.nota.upsert({
     *   create: {
     *     // ... data to create a Nota
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nota we want to update
     *   }
     * })
     */
    upsert<T extends NotaUpsertArgs>(args: SelectSubset<T, NotaUpsertArgs<ExtArgs>>): Prisma__NotaClient<$Result.GetResult<Prisma.$NotaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaCountArgs} args - Arguments to filter Notas to count.
     * @example
     * // Count the number of Notas
     * const count = await prisma.nota.count({
     *   where: {
     *     // ... the filter for the Notas we want to count
     *   }
     * })
    **/
    count<T extends NotaCountArgs>(
      args?: Subset<T, NotaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nota.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotaAggregateArgs>(args: Subset<T, NotaAggregateArgs>): Prisma.PrismaPromise<GetNotaAggregateType<T>>

    /**
     * Group by Nota.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotaGroupByArgs['orderBy'] }
        : { orderBy?: NotaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Nota model
   */
  readonly fields: NotaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Nota.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aluno<T extends AlunoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlunoDefaultArgs<ExtArgs>>): Prisma__AlunoClient<$Result.GetResult<Prisma.$AlunoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    disciplina<T extends DisciplinaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DisciplinaDefaultArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Nota model
   */ 
  interface NotaFieldRefs {
    readonly id: FieldRef<"Nota", 'Int'>
    readonly valor: FieldRef<"Nota", 'Float'>
    readonly tipo: FieldRef<"Nota", 'String'>
    readonly alunoId: FieldRef<"Nota", 'Int'>
    readonly disciplinaId: FieldRef<"Nota", 'Int'>
    readonly semestre: FieldRef<"Nota", 'Int'>
    readonly observacao: FieldRef<"Nota", 'String'>
    readonly criadoEm: FieldRef<"Nota", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Nota", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Nota findUnique
   */
  export type NotaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter, which Nota to fetch.
     */
    where: NotaWhereUniqueInput
  }

  /**
   * Nota findUniqueOrThrow
   */
  export type NotaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter, which Nota to fetch.
     */
    where: NotaWhereUniqueInput
  }

  /**
   * Nota findFirst
   */
  export type NotaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter, which Nota to fetch.
     */
    where?: NotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notas to fetch.
     */
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notas.
     */
    cursor?: NotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notas.
     */
    distinct?: NotaScalarFieldEnum | NotaScalarFieldEnum[]
  }

  /**
   * Nota findFirstOrThrow
   */
  export type NotaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter, which Nota to fetch.
     */
    where?: NotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notas to fetch.
     */
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notas.
     */
    cursor?: NotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notas.
     */
    distinct?: NotaScalarFieldEnum | NotaScalarFieldEnum[]
  }

  /**
   * Nota findMany
   */
  export type NotaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter, which Notas to fetch.
     */
    where?: NotaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notas to fetch.
     */
    orderBy?: NotaOrderByWithRelationInput | NotaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notas.
     */
    cursor?: NotaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notas.
     */
    skip?: number
    distinct?: NotaScalarFieldEnum | NotaScalarFieldEnum[]
  }

  /**
   * Nota create
   */
  export type NotaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * The data needed to create a Nota.
     */
    data: XOR<NotaCreateInput, NotaUncheckedCreateInput>
  }

  /**
   * Nota createMany
   */
  export type NotaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notas.
     */
    data: NotaCreateManyInput | NotaCreateManyInput[]
  }

  /**
   * Nota createManyAndReturn
   */
  export type NotaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notas.
     */
    data: NotaCreateManyInput | NotaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Nota update
   */
  export type NotaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * The data needed to update a Nota.
     */
    data: XOR<NotaUpdateInput, NotaUncheckedUpdateInput>
    /**
     * Choose, which Nota to update.
     */
    where: NotaWhereUniqueInput
  }

  /**
   * Nota updateMany
   */
  export type NotaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notas.
     */
    data: XOR<NotaUpdateManyMutationInput, NotaUncheckedUpdateManyInput>
    /**
     * Filter which Notas to update
     */
    where?: NotaWhereInput
  }

  /**
   * Nota upsert
   */
  export type NotaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * The filter to search for the Nota to update in case it exists.
     */
    where: NotaWhereUniqueInput
    /**
     * In case the Nota found by the `where` argument doesn't exist, create a new Nota with this data.
     */
    create: XOR<NotaCreateInput, NotaUncheckedCreateInput>
    /**
     * In case the Nota was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotaUpdateInput, NotaUncheckedUpdateInput>
  }

  /**
   * Nota delete
   */
  export type NotaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
    /**
     * Filter which Nota to delete.
     */
    where: NotaWhereUniqueInput
  }

  /**
   * Nota deleteMany
   */
  export type NotaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notas to delete
     */
    where?: NotaWhereInput
  }

  /**
   * Nota without action
   */
  export type NotaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Nota
     */
    select?: NotaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotaInclude<ExtArgs> | null
  }


  /**
   * Model Mensagem
   */

  export type AggregateMensagem = {
    _count: MensagemCountAggregateOutputType | null
    _avg: MensagemAvgAggregateOutputType | null
    _sum: MensagemSumAggregateOutputType | null
    _min: MensagemMinAggregateOutputType | null
    _max: MensagemMaxAggregateOutputType | null
  }

  export type MensagemAvgAggregateOutputType = {
    id: number | null
    remetenteId: number | null
    destinatarioId: number | null
    arquivoTamanho: number | null
  }

  export type MensagemSumAggregateOutputType = {
    id: number | null
    remetenteId: number | null
    destinatarioId: number | null
    arquivoTamanho: number | null
  }

  export type MensagemMinAggregateOutputType = {
    id: number | null
    conteudo: string | null
    remetenteId: number | null
    destinatarioId: number | null
    lida: boolean | null
    lidaEm: Date | null
    editadoEm: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    deletadoParaRemetente: boolean | null
    deletadoParaDestinatario: boolean | null
    arquivoUrl: string | null
    arquivoNome: string | null
    arquivoTipo: string | null
    arquivoTamanho: number | null
  }

  export type MensagemMaxAggregateOutputType = {
    id: number | null
    conteudo: string | null
    remetenteId: number | null
    destinatarioId: number | null
    lida: boolean | null
    lidaEm: Date | null
    editadoEm: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
    deletadoParaRemetente: boolean | null
    deletadoParaDestinatario: boolean | null
    arquivoUrl: string | null
    arquivoNome: string | null
    arquivoTipo: string | null
    arquivoTamanho: number | null
  }

  export type MensagemCountAggregateOutputType = {
    id: number
    conteudo: number
    remetenteId: number
    destinatarioId: number
    lida: number
    lidaEm: number
    editadoEm: number
    criadoEm: number
    atualizadoEm: number
    deletadoParaRemetente: number
    deletadoParaDestinatario: number
    arquivoUrl: number
    arquivoNome: number
    arquivoTipo: number
    arquivoTamanho: number
    _all: number
  }


  export type MensagemAvgAggregateInputType = {
    id?: true
    remetenteId?: true
    destinatarioId?: true
    arquivoTamanho?: true
  }

  export type MensagemSumAggregateInputType = {
    id?: true
    remetenteId?: true
    destinatarioId?: true
    arquivoTamanho?: true
  }

  export type MensagemMinAggregateInputType = {
    id?: true
    conteudo?: true
    remetenteId?: true
    destinatarioId?: true
    lida?: true
    lidaEm?: true
    editadoEm?: true
    criadoEm?: true
    atualizadoEm?: true
    deletadoParaRemetente?: true
    deletadoParaDestinatario?: true
    arquivoUrl?: true
    arquivoNome?: true
    arquivoTipo?: true
    arquivoTamanho?: true
  }

  export type MensagemMaxAggregateInputType = {
    id?: true
    conteudo?: true
    remetenteId?: true
    destinatarioId?: true
    lida?: true
    lidaEm?: true
    editadoEm?: true
    criadoEm?: true
    atualizadoEm?: true
    deletadoParaRemetente?: true
    deletadoParaDestinatario?: true
    arquivoUrl?: true
    arquivoNome?: true
    arquivoTipo?: true
    arquivoTamanho?: true
  }

  export type MensagemCountAggregateInputType = {
    id?: true
    conteudo?: true
    remetenteId?: true
    destinatarioId?: true
    lida?: true
    lidaEm?: true
    editadoEm?: true
    criadoEm?: true
    atualizadoEm?: true
    deletadoParaRemetente?: true
    deletadoParaDestinatario?: true
    arquivoUrl?: true
    arquivoNome?: true
    arquivoTipo?: true
    arquivoTamanho?: true
    _all?: true
  }

  export type MensagemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagem to aggregate.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mensagems
    **/
    _count?: true | MensagemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MensagemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MensagemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MensagemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MensagemMaxAggregateInputType
  }

  export type GetMensagemAggregateType<T extends MensagemAggregateArgs> = {
        [P in keyof T & keyof AggregateMensagem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMensagem[P]>
      : GetScalarType<T[P], AggregateMensagem[P]>
  }




  export type MensagemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagemWhereInput
    orderBy?: MensagemOrderByWithAggregationInput | MensagemOrderByWithAggregationInput[]
    by: MensagemScalarFieldEnum[] | MensagemScalarFieldEnum
    having?: MensagemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MensagemCountAggregateInputType | true
    _avg?: MensagemAvgAggregateInputType
    _sum?: MensagemSumAggregateInputType
    _min?: MensagemMinAggregateInputType
    _max?: MensagemMaxAggregateInputType
  }

  export type MensagemGroupByOutputType = {
    id: number
    conteudo: string
    remetenteId: number
    destinatarioId: number
    lida: boolean
    lidaEm: Date | null
    editadoEm: Date | null
    criadoEm: Date
    atualizadoEm: Date
    deletadoParaRemetente: boolean
    deletadoParaDestinatario: boolean
    arquivoUrl: string | null
    arquivoNome: string | null
    arquivoTipo: string | null
    arquivoTamanho: number | null
    _count: MensagemCountAggregateOutputType | null
    _avg: MensagemAvgAggregateOutputType | null
    _sum: MensagemSumAggregateOutputType | null
    _min: MensagemMinAggregateOutputType | null
    _max: MensagemMaxAggregateOutputType | null
  }

  type GetMensagemGroupByPayload<T extends MensagemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MensagemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MensagemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MensagemGroupByOutputType[P]>
            : GetScalarType<T[P], MensagemGroupByOutputType[P]>
        }
      >
    >


  export type MensagemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conteudo?: boolean
    remetenteId?: boolean
    destinatarioId?: boolean
    lida?: boolean
    lidaEm?: boolean
    editadoEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: boolean
    arquivoNome?: boolean
    arquivoTipo?: boolean
    arquivoTamanho?: boolean
    remetente?: boolean | UsuarioDefaultArgs<ExtArgs>
    destinatario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensagem"]>

  export type MensagemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conteudo?: boolean
    remetenteId?: boolean
    destinatarioId?: boolean
    lida?: boolean
    lidaEm?: boolean
    editadoEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: boolean
    arquivoNome?: boolean
    arquivoTipo?: boolean
    arquivoTamanho?: boolean
    remetente?: boolean | UsuarioDefaultArgs<ExtArgs>
    destinatario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensagem"]>

  export type MensagemSelectScalar = {
    id?: boolean
    conteudo?: boolean
    remetenteId?: boolean
    destinatarioId?: boolean
    lida?: boolean
    lidaEm?: boolean
    editadoEm?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: boolean
    arquivoNome?: boolean
    arquivoTipo?: boolean
    arquivoTamanho?: boolean
  }

  export type MensagemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remetente?: boolean | UsuarioDefaultArgs<ExtArgs>
    destinatario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type MensagemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    remetente?: boolean | UsuarioDefaultArgs<ExtArgs>
    destinatario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $MensagemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mensagem"
    objects: {
      remetente: Prisma.$UsuarioPayload<ExtArgs>
      destinatario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      conteudo: string
      remetenteId: number
      destinatarioId: number
      lida: boolean
      lidaEm: Date | null
      editadoEm: Date | null
      criadoEm: Date
      atualizadoEm: Date
      deletadoParaRemetente: boolean
      deletadoParaDestinatario: boolean
      arquivoUrl: string | null
      arquivoNome: string | null
      arquivoTipo: string | null
      arquivoTamanho: number | null
    }, ExtArgs["result"]["mensagem"]>
    composites: {}
  }

  type MensagemGetPayload<S extends boolean | null | undefined | MensagemDefaultArgs> = $Result.GetResult<Prisma.$MensagemPayload, S>

  type MensagemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MensagemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MensagemCountAggregateInputType | true
    }

  export interface MensagemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mensagem'], meta: { name: 'Mensagem' } }
    /**
     * Find zero or one Mensagem that matches the filter.
     * @param {MensagemFindUniqueArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MensagemFindUniqueArgs>(args: SelectSubset<T, MensagemFindUniqueArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Mensagem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MensagemFindUniqueOrThrowArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MensagemFindUniqueOrThrowArgs>(args: SelectSubset<T, MensagemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Mensagem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindFirstArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MensagemFindFirstArgs>(args?: SelectSubset<T, MensagemFindFirstArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Mensagem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindFirstOrThrowArgs} args - Arguments to find a Mensagem
     * @example
     * // Get one Mensagem
     * const mensagem = await prisma.mensagem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MensagemFindFirstOrThrowArgs>(args?: SelectSubset<T, MensagemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Mensagems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mensagems
     * const mensagems = await prisma.mensagem.findMany()
     * 
     * // Get first 10 Mensagems
     * const mensagems = await prisma.mensagem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mensagemWithIdOnly = await prisma.mensagem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MensagemFindManyArgs>(args?: SelectSubset<T, MensagemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Mensagem.
     * @param {MensagemCreateArgs} args - Arguments to create a Mensagem.
     * @example
     * // Create one Mensagem
     * const Mensagem = await prisma.mensagem.create({
     *   data: {
     *     // ... data to create a Mensagem
     *   }
     * })
     * 
     */
    create<T extends MensagemCreateArgs>(args: SelectSubset<T, MensagemCreateArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Mensagems.
     * @param {MensagemCreateManyArgs} args - Arguments to create many Mensagems.
     * @example
     * // Create many Mensagems
     * const mensagem = await prisma.mensagem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MensagemCreateManyArgs>(args?: SelectSubset<T, MensagemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mensagems and returns the data saved in the database.
     * @param {MensagemCreateManyAndReturnArgs} args - Arguments to create many Mensagems.
     * @example
     * // Create many Mensagems
     * const mensagem = await prisma.mensagem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mensagems and only return the `id`
     * const mensagemWithIdOnly = await prisma.mensagem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MensagemCreateManyAndReturnArgs>(args?: SelectSubset<T, MensagemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Mensagem.
     * @param {MensagemDeleteArgs} args - Arguments to delete one Mensagem.
     * @example
     * // Delete one Mensagem
     * const Mensagem = await prisma.mensagem.delete({
     *   where: {
     *     // ... filter to delete one Mensagem
     *   }
     * })
     * 
     */
    delete<T extends MensagemDeleteArgs>(args: SelectSubset<T, MensagemDeleteArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Mensagem.
     * @param {MensagemUpdateArgs} args - Arguments to update one Mensagem.
     * @example
     * // Update one Mensagem
     * const mensagem = await prisma.mensagem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MensagemUpdateArgs>(args: SelectSubset<T, MensagemUpdateArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Mensagems.
     * @param {MensagemDeleteManyArgs} args - Arguments to filter Mensagems to delete.
     * @example
     * // Delete a few Mensagems
     * const { count } = await prisma.mensagem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MensagemDeleteManyArgs>(args?: SelectSubset<T, MensagemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensagems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mensagems
     * const mensagem = await prisma.mensagem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MensagemUpdateManyArgs>(args: SelectSubset<T, MensagemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mensagem.
     * @param {MensagemUpsertArgs} args - Arguments to update or create a Mensagem.
     * @example
     * // Update or create a Mensagem
     * const mensagem = await prisma.mensagem.upsert({
     *   create: {
     *     // ... data to create a Mensagem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mensagem we want to update
     *   }
     * })
     */
    upsert<T extends MensagemUpsertArgs>(args: SelectSubset<T, MensagemUpsertArgs<ExtArgs>>): Prisma__MensagemClient<$Result.GetResult<Prisma.$MensagemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Mensagems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemCountArgs} args - Arguments to filter Mensagems to count.
     * @example
     * // Count the number of Mensagems
     * const count = await prisma.mensagem.count({
     *   where: {
     *     // ... the filter for the Mensagems we want to count
     *   }
     * })
    **/
    count<T extends MensagemCountArgs>(
      args?: Subset<T, MensagemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MensagemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mensagem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MensagemAggregateArgs>(args: Subset<T, MensagemAggregateArgs>): Prisma.PrismaPromise<GetMensagemAggregateType<T>>

    /**
     * Group by Mensagem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MensagemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MensagemGroupByArgs['orderBy'] }
        : { orderBy?: MensagemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MensagemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMensagemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mensagem model
   */
  readonly fields: MensagemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mensagem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MensagemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    remetente<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    destinatario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mensagem model
   */ 
  interface MensagemFieldRefs {
    readonly id: FieldRef<"Mensagem", 'Int'>
    readonly conteudo: FieldRef<"Mensagem", 'String'>
    readonly remetenteId: FieldRef<"Mensagem", 'Int'>
    readonly destinatarioId: FieldRef<"Mensagem", 'Int'>
    readonly lida: FieldRef<"Mensagem", 'Boolean'>
    readonly lidaEm: FieldRef<"Mensagem", 'DateTime'>
    readonly editadoEm: FieldRef<"Mensagem", 'DateTime'>
    readonly criadoEm: FieldRef<"Mensagem", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Mensagem", 'DateTime'>
    readonly deletadoParaRemetente: FieldRef<"Mensagem", 'Boolean'>
    readonly deletadoParaDestinatario: FieldRef<"Mensagem", 'Boolean'>
    readonly arquivoUrl: FieldRef<"Mensagem", 'String'>
    readonly arquivoNome: FieldRef<"Mensagem", 'String'>
    readonly arquivoTipo: FieldRef<"Mensagem", 'String'>
    readonly arquivoTamanho: FieldRef<"Mensagem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Mensagem findUnique
   */
  export type MensagemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem findUniqueOrThrow
   */
  export type MensagemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem findFirst
   */
  export type MensagemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagems.
     */
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem findFirstOrThrow
   */
  export type MensagemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagem to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagems.
     */
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem findMany
   */
  export type MensagemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter, which Mensagems to fetch.
     */
    where?: MensagemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagems to fetch.
     */
    orderBy?: MensagemOrderByWithRelationInput | MensagemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mensagems.
     */
    cursor?: MensagemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagems.
     */
    skip?: number
    distinct?: MensagemScalarFieldEnum | MensagemScalarFieldEnum[]
  }

  /**
   * Mensagem create
   */
  export type MensagemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The data needed to create a Mensagem.
     */
    data: XOR<MensagemCreateInput, MensagemUncheckedCreateInput>
  }

  /**
   * Mensagem createMany
   */
  export type MensagemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mensagems.
     */
    data: MensagemCreateManyInput | MensagemCreateManyInput[]
  }

  /**
   * Mensagem createManyAndReturn
   */
  export type MensagemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Mensagems.
     */
    data: MensagemCreateManyInput | MensagemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mensagem update
   */
  export type MensagemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The data needed to update a Mensagem.
     */
    data: XOR<MensagemUpdateInput, MensagemUncheckedUpdateInput>
    /**
     * Choose, which Mensagem to update.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem updateMany
   */
  export type MensagemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mensagems.
     */
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyInput>
    /**
     * Filter which Mensagems to update
     */
    where?: MensagemWhereInput
  }

  /**
   * Mensagem upsert
   */
  export type MensagemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * The filter to search for the Mensagem to update in case it exists.
     */
    where: MensagemWhereUniqueInput
    /**
     * In case the Mensagem found by the `where` argument doesn't exist, create a new Mensagem with this data.
     */
    create: XOR<MensagemCreateInput, MensagemUncheckedCreateInput>
    /**
     * In case the Mensagem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MensagemUpdateInput, MensagemUncheckedUpdateInput>
  }

  /**
   * Mensagem delete
   */
  export type MensagemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
    /**
     * Filter which Mensagem to delete.
     */
    where: MensagemWhereUniqueInput
  }

  /**
   * Mensagem deleteMany
   */
  export type MensagemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagems to delete
     */
    where?: MensagemWhereInput
  }

  /**
   * Mensagem without action
   */
  export type MensagemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagem
     */
    select?: MensagemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagemInclude<ExtArgs> | null
  }


  /**
   * Model Aviso
   */

  export type AggregateAviso = {
    _count: AvisoCountAggregateOutputType | null
    _avg: AvisoAvgAggregateOutputType | null
    _sum: AvisoSumAggregateOutputType | null
    _min: AvisoMinAggregateOutputType | null
    _max: AvisoMaxAggregateOutputType | null
  }

  export type AvisoAvgAggregateOutputType = {
    id: number | null
    autorId: number | null
  }

  export type AvisoSumAggregateOutputType = {
    id: number | null
    autorId: number | null
  }

  export type AvisoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    conteudo: string | null
    imagem: string | null
    categoria: string | null
    autorId: number | null
    autorNome: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type AvisoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    conteudo: string | null
    imagem: string | null
    categoria: string | null
    autorId: number | null
    autorNome: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type AvisoCountAggregateOutputType = {
    id: number
    titulo: number
    conteudo: number
    imagem: number
    categoria: number
    autorId: number
    autorNome: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type AvisoAvgAggregateInputType = {
    id?: true
    autorId?: true
  }

  export type AvisoSumAggregateInputType = {
    id?: true
    autorId?: true
  }

  export type AvisoMinAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    imagem?: true
    categoria?: true
    autorId?: true
    autorNome?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type AvisoMaxAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    imagem?: true
    categoria?: true
    autorId?: true
    autorNome?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type AvisoCountAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    imagem?: true
    categoria?: true
    autorId?: true
    autorNome?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type AvisoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aviso to aggregate.
     */
    where?: AvisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avisos to fetch.
     */
    orderBy?: AvisoOrderByWithRelationInput | AvisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Avisos
    **/
    _count?: true | AvisoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvisoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvisoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvisoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvisoMaxAggregateInputType
  }

  export type GetAvisoAggregateType<T extends AvisoAggregateArgs> = {
        [P in keyof T & keyof AggregateAviso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAviso[P]>
      : GetScalarType<T[P], AggregateAviso[P]>
  }




  export type AvisoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvisoWhereInput
    orderBy?: AvisoOrderByWithAggregationInput | AvisoOrderByWithAggregationInput[]
    by: AvisoScalarFieldEnum[] | AvisoScalarFieldEnum
    having?: AvisoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvisoCountAggregateInputType | true
    _avg?: AvisoAvgAggregateInputType
    _sum?: AvisoSumAggregateInputType
    _min?: AvisoMinAggregateInputType
    _max?: AvisoMaxAggregateInputType
  }

  export type AvisoGroupByOutputType = {
    id: number
    titulo: string
    conteudo: string
    imagem: string | null
    categoria: string
    autorId: number | null
    autorNome: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: AvisoCountAggregateOutputType | null
    _avg: AvisoAvgAggregateOutputType | null
    _sum: AvisoSumAggregateOutputType | null
    _min: AvisoMinAggregateOutputType | null
    _max: AvisoMaxAggregateOutputType | null
  }

  type GetAvisoGroupByPayload<T extends AvisoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvisoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvisoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvisoGroupByOutputType[P]>
            : GetScalarType<T[P], AvisoGroupByOutputType[P]>
        }
      >
    >


  export type AvisoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    imagem?: boolean
    categoria?: boolean
    autorId?: boolean
    autorNome?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["aviso"]>

  export type AvisoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    imagem?: boolean
    categoria?: boolean
    autorId?: boolean
    autorNome?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["aviso"]>

  export type AvisoSelectScalar = {
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    imagem?: boolean
    categoria?: boolean
    autorId?: boolean
    autorNome?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }


  export type $AvisoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aviso"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      conteudo: string
      imagem: string | null
      categoria: string
      autorId: number | null
      autorNome: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["aviso"]>
    composites: {}
  }

  type AvisoGetPayload<S extends boolean | null | undefined | AvisoDefaultArgs> = $Result.GetResult<Prisma.$AvisoPayload, S>

  type AvisoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AvisoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AvisoCountAggregateInputType | true
    }

  export interface AvisoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aviso'], meta: { name: 'Aviso' } }
    /**
     * Find zero or one Aviso that matches the filter.
     * @param {AvisoFindUniqueArgs} args - Arguments to find a Aviso
     * @example
     * // Get one Aviso
     * const aviso = await prisma.aviso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvisoFindUniqueArgs>(args: SelectSubset<T, AvisoFindUniqueArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Aviso that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AvisoFindUniqueOrThrowArgs} args - Arguments to find a Aviso
     * @example
     * // Get one Aviso
     * const aviso = await prisma.aviso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvisoFindUniqueOrThrowArgs>(args: SelectSubset<T, AvisoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Aviso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoFindFirstArgs} args - Arguments to find a Aviso
     * @example
     * // Get one Aviso
     * const aviso = await prisma.aviso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvisoFindFirstArgs>(args?: SelectSubset<T, AvisoFindFirstArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Aviso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoFindFirstOrThrowArgs} args - Arguments to find a Aviso
     * @example
     * // Get one Aviso
     * const aviso = await prisma.aviso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvisoFindFirstOrThrowArgs>(args?: SelectSubset<T, AvisoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Avisos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avisos
     * const avisos = await prisma.aviso.findMany()
     * 
     * // Get first 10 Avisos
     * const avisos = await prisma.aviso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avisoWithIdOnly = await prisma.aviso.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvisoFindManyArgs>(args?: SelectSubset<T, AvisoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Aviso.
     * @param {AvisoCreateArgs} args - Arguments to create a Aviso.
     * @example
     * // Create one Aviso
     * const Aviso = await prisma.aviso.create({
     *   data: {
     *     // ... data to create a Aviso
     *   }
     * })
     * 
     */
    create<T extends AvisoCreateArgs>(args: SelectSubset<T, AvisoCreateArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Avisos.
     * @param {AvisoCreateManyArgs} args - Arguments to create many Avisos.
     * @example
     * // Create many Avisos
     * const aviso = await prisma.aviso.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvisoCreateManyArgs>(args?: SelectSubset<T, AvisoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Avisos and returns the data saved in the database.
     * @param {AvisoCreateManyAndReturnArgs} args - Arguments to create many Avisos.
     * @example
     * // Create many Avisos
     * const aviso = await prisma.aviso.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Avisos and only return the `id`
     * const avisoWithIdOnly = await prisma.aviso.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvisoCreateManyAndReturnArgs>(args?: SelectSubset<T, AvisoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Aviso.
     * @param {AvisoDeleteArgs} args - Arguments to delete one Aviso.
     * @example
     * // Delete one Aviso
     * const Aviso = await prisma.aviso.delete({
     *   where: {
     *     // ... filter to delete one Aviso
     *   }
     * })
     * 
     */
    delete<T extends AvisoDeleteArgs>(args: SelectSubset<T, AvisoDeleteArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Aviso.
     * @param {AvisoUpdateArgs} args - Arguments to update one Aviso.
     * @example
     * // Update one Aviso
     * const aviso = await prisma.aviso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvisoUpdateArgs>(args: SelectSubset<T, AvisoUpdateArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Avisos.
     * @param {AvisoDeleteManyArgs} args - Arguments to filter Avisos to delete.
     * @example
     * // Delete a few Avisos
     * const { count } = await prisma.aviso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvisoDeleteManyArgs>(args?: SelectSubset<T, AvisoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avisos
     * const aviso = await prisma.aviso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvisoUpdateManyArgs>(args: SelectSubset<T, AvisoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Aviso.
     * @param {AvisoUpsertArgs} args - Arguments to update or create a Aviso.
     * @example
     * // Update or create a Aviso
     * const aviso = await prisma.aviso.upsert({
     *   create: {
     *     // ... data to create a Aviso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aviso we want to update
     *   }
     * })
     */
    upsert<T extends AvisoUpsertArgs>(args: SelectSubset<T, AvisoUpsertArgs<ExtArgs>>): Prisma__AvisoClient<$Result.GetResult<Prisma.$AvisoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Avisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoCountArgs} args - Arguments to filter Avisos to count.
     * @example
     * // Count the number of Avisos
     * const count = await prisma.aviso.count({
     *   where: {
     *     // ... the filter for the Avisos we want to count
     *   }
     * })
    **/
    count<T extends AvisoCountArgs>(
      args?: Subset<T, AvisoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvisoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aviso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvisoAggregateArgs>(args: Subset<T, AvisoAggregateArgs>): Prisma.PrismaPromise<GetAvisoAggregateType<T>>

    /**
     * Group by Aviso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvisoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvisoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvisoGroupByArgs['orderBy'] }
        : { orderBy?: AvisoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvisoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvisoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aviso model
   */
  readonly fields: AvisoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aviso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvisoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Aviso model
   */ 
  interface AvisoFieldRefs {
    readonly id: FieldRef<"Aviso", 'Int'>
    readonly titulo: FieldRef<"Aviso", 'String'>
    readonly conteudo: FieldRef<"Aviso", 'String'>
    readonly imagem: FieldRef<"Aviso", 'String'>
    readonly categoria: FieldRef<"Aviso", 'String'>
    readonly autorId: FieldRef<"Aviso", 'Int'>
    readonly autorNome: FieldRef<"Aviso", 'String'>
    readonly criadoEm: FieldRef<"Aviso", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Aviso", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Aviso findUnique
   */
  export type AvisoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter, which Aviso to fetch.
     */
    where: AvisoWhereUniqueInput
  }

  /**
   * Aviso findUniqueOrThrow
   */
  export type AvisoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter, which Aviso to fetch.
     */
    where: AvisoWhereUniqueInput
  }

  /**
   * Aviso findFirst
   */
  export type AvisoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter, which Aviso to fetch.
     */
    where?: AvisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avisos to fetch.
     */
    orderBy?: AvisoOrderByWithRelationInput | AvisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avisos.
     */
    cursor?: AvisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avisos.
     */
    distinct?: AvisoScalarFieldEnum | AvisoScalarFieldEnum[]
  }

  /**
   * Aviso findFirstOrThrow
   */
  export type AvisoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter, which Aviso to fetch.
     */
    where?: AvisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avisos to fetch.
     */
    orderBy?: AvisoOrderByWithRelationInput | AvisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avisos.
     */
    cursor?: AvisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avisos.
     */
    distinct?: AvisoScalarFieldEnum | AvisoScalarFieldEnum[]
  }

  /**
   * Aviso findMany
   */
  export type AvisoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter, which Avisos to fetch.
     */
    where?: AvisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avisos to fetch.
     */
    orderBy?: AvisoOrderByWithRelationInput | AvisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Avisos.
     */
    cursor?: AvisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avisos.
     */
    skip?: number
    distinct?: AvisoScalarFieldEnum | AvisoScalarFieldEnum[]
  }

  /**
   * Aviso create
   */
  export type AvisoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * The data needed to create a Aviso.
     */
    data: XOR<AvisoCreateInput, AvisoUncheckedCreateInput>
  }

  /**
   * Aviso createMany
   */
  export type AvisoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Avisos.
     */
    data: AvisoCreateManyInput | AvisoCreateManyInput[]
  }

  /**
   * Aviso createManyAndReturn
   */
  export type AvisoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Avisos.
     */
    data: AvisoCreateManyInput | AvisoCreateManyInput[]
  }

  /**
   * Aviso update
   */
  export type AvisoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * The data needed to update a Aviso.
     */
    data: XOR<AvisoUpdateInput, AvisoUncheckedUpdateInput>
    /**
     * Choose, which Aviso to update.
     */
    where: AvisoWhereUniqueInput
  }

  /**
   * Aviso updateMany
   */
  export type AvisoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Avisos.
     */
    data: XOR<AvisoUpdateManyMutationInput, AvisoUncheckedUpdateManyInput>
    /**
     * Filter which Avisos to update
     */
    where?: AvisoWhereInput
  }

  /**
   * Aviso upsert
   */
  export type AvisoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * The filter to search for the Aviso to update in case it exists.
     */
    where: AvisoWhereUniqueInput
    /**
     * In case the Aviso found by the `where` argument doesn't exist, create a new Aviso with this data.
     */
    create: XOR<AvisoCreateInput, AvisoUncheckedCreateInput>
    /**
     * In case the Aviso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvisoUpdateInput, AvisoUncheckedUpdateInput>
  }

  /**
   * Aviso delete
   */
  export type AvisoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
    /**
     * Filter which Aviso to delete.
     */
    where: AvisoWhereUniqueInput
  }

  /**
   * Aviso deleteMany
   */
  export type AvisoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avisos to delete
     */
    where?: AvisoWhereInput
  }

  /**
   * Aviso without action
   */
  export type AvisoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aviso
     */
    select?: AvisoSelect<ExtArgs> | null
  }


  /**
   * Model Evento
   */

  export type AggregateEvento = {
    _count: EventoCountAggregateOutputType | null
    _avg: EventoAvgAggregateOutputType | null
    _sum: EventoSumAggregateOutputType | null
    _min: EventoMinAggregateOutputType | null
    _max: EventoMaxAggregateOutputType | null
  }

  export type EventoAvgAggregateOutputType = {
    id: number | null
    maxParticipantes: number | null
  }

  export type EventoSumAggregateOutputType = {
    id: number | null
    maxParticipantes: number | null
  }

  export type EventoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    imagem: string | null
    dataEvento: Date | null
    dataFim: Date | null
    local: string | null
    organizador: string | null
    maxParticipantes: number | null
    categoria: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EventoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    imagem: string | null
    dataEvento: Date | null
    dataFim: Date | null
    local: string | null
    organizador: string | null
    maxParticipantes: number | null
    categoria: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type EventoCountAggregateOutputType = {
    id: number
    titulo: number
    descricao: number
    imagem: number
    dataEvento: number
    dataFim: number
    local: number
    organizador: number
    maxParticipantes: number
    categoria: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type EventoAvgAggregateInputType = {
    id?: true
    maxParticipantes?: true
  }

  export type EventoSumAggregateInputType = {
    id?: true
    maxParticipantes?: true
  }

  export type EventoMinAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    imagem?: true
    dataEvento?: true
    dataFim?: true
    local?: true
    organizador?: true
    maxParticipantes?: true
    categoria?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EventoMaxAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    imagem?: true
    dataEvento?: true
    dataFim?: true
    local?: true
    organizador?: true
    maxParticipantes?: true
    categoria?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type EventoCountAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    imagem?: true
    dataEvento?: true
    dataFim?: true
    local?: true
    organizador?: true
    maxParticipantes?: true
    categoria?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type EventoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evento to aggregate.
     */
    where?: EventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eventos
    **/
    _count?: true | EventoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventoMaxAggregateInputType
  }

  export type GetEventoAggregateType<T extends EventoAggregateArgs> = {
        [P in keyof T & keyof AggregateEvento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvento[P]>
      : GetScalarType<T[P], AggregateEvento[P]>
  }




  export type EventoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventoWhereInput
    orderBy?: EventoOrderByWithAggregationInput | EventoOrderByWithAggregationInput[]
    by: EventoScalarFieldEnum[] | EventoScalarFieldEnum
    having?: EventoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventoCountAggregateInputType | true
    _avg?: EventoAvgAggregateInputType
    _sum?: EventoSumAggregateInputType
    _min?: EventoMinAggregateInputType
    _max?: EventoMaxAggregateInputType
  }

  export type EventoGroupByOutputType = {
    id: number
    titulo: string
    descricao: string
    imagem: string | null
    dataEvento: Date | null
    dataFim: Date | null
    local: string | null
    organizador: string | null
    maxParticipantes: number | null
    categoria: string
    criadoEm: Date
    atualizadoEm: Date
    _count: EventoCountAggregateOutputType | null
    _avg: EventoAvgAggregateOutputType | null
    _sum: EventoSumAggregateOutputType | null
    _min: EventoMinAggregateOutputType | null
    _max: EventoMaxAggregateOutputType | null
  }

  type GetEventoGroupByPayload<T extends EventoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventoGroupByOutputType[P]>
            : GetScalarType<T[P], EventoGroupByOutputType[P]>
        }
      >
    >


  export type EventoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    imagem?: boolean
    dataEvento?: boolean
    dataFim?: boolean
    local?: boolean
    organizador?: boolean
    maxParticipantes?: boolean
    categoria?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["evento"]>

  export type EventoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    imagem?: boolean
    dataEvento?: boolean
    dataFim?: boolean
    local?: boolean
    organizador?: boolean
    maxParticipantes?: boolean
    categoria?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["evento"]>

  export type EventoSelectScalar = {
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    imagem?: boolean
    dataEvento?: boolean
    dataFim?: boolean
    local?: boolean
    organizador?: boolean
    maxParticipantes?: boolean
    categoria?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }


  export type $EventoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evento"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descricao: string
      imagem: string | null
      dataEvento: Date | null
      dataFim: Date | null
      local: string | null
      organizador: string | null
      maxParticipantes: number | null
      categoria: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["evento"]>
    composites: {}
  }

  type EventoGetPayload<S extends boolean | null | undefined | EventoDefaultArgs> = $Result.GetResult<Prisma.$EventoPayload, S>

  type EventoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EventoCountAggregateInputType | true
    }

  export interface EventoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evento'], meta: { name: 'Evento' } }
    /**
     * Find zero or one Evento that matches the filter.
     * @param {EventoFindUniqueArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventoFindUniqueArgs>(args: SelectSubset<T, EventoFindUniqueArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Evento that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EventoFindUniqueOrThrowArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventoFindUniqueOrThrowArgs>(args: SelectSubset<T, EventoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Evento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindFirstArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventoFindFirstArgs>(args?: SelectSubset<T, EventoFindFirstArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Evento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindFirstOrThrowArgs} args - Arguments to find a Evento
     * @example
     * // Get one Evento
     * const evento = await prisma.evento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventoFindFirstOrThrowArgs>(args?: SelectSubset<T, EventoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Eventos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eventos
     * const eventos = await prisma.evento.findMany()
     * 
     * // Get first 10 Eventos
     * const eventos = await prisma.evento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventoWithIdOnly = await prisma.evento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventoFindManyArgs>(args?: SelectSubset<T, EventoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Evento.
     * @param {EventoCreateArgs} args - Arguments to create a Evento.
     * @example
     * // Create one Evento
     * const Evento = await prisma.evento.create({
     *   data: {
     *     // ... data to create a Evento
     *   }
     * })
     * 
     */
    create<T extends EventoCreateArgs>(args: SelectSubset<T, EventoCreateArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Eventos.
     * @param {EventoCreateManyArgs} args - Arguments to create many Eventos.
     * @example
     * // Create many Eventos
     * const evento = await prisma.evento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventoCreateManyArgs>(args?: SelectSubset<T, EventoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Eventos and returns the data saved in the database.
     * @param {EventoCreateManyAndReturnArgs} args - Arguments to create many Eventos.
     * @example
     * // Create many Eventos
     * const evento = await prisma.evento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Eventos and only return the `id`
     * const eventoWithIdOnly = await prisma.evento.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventoCreateManyAndReturnArgs>(args?: SelectSubset<T, EventoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Evento.
     * @param {EventoDeleteArgs} args - Arguments to delete one Evento.
     * @example
     * // Delete one Evento
     * const Evento = await prisma.evento.delete({
     *   where: {
     *     // ... filter to delete one Evento
     *   }
     * })
     * 
     */
    delete<T extends EventoDeleteArgs>(args: SelectSubset<T, EventoDeleteArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Evento.
     * @param {EventoUpdateArgs} args - Arguments to update one Evento.
     * @example
     * // Update one Evento
     * const evento = await prisma.evento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventoUpdateArgs>(args: SelectSubset<T, EventoUpdateArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Eventos.
     * @param {EventoDeleteManyArgs} args - Arguments to filter Eventos to delete.
     * @example
     * // Delete a few Eventos
     * const { count } = await prisma.evento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventoDeleteManyArgs>(args?: SelectSubset<T, EventoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eventos
     * const evento = await prisma.evento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventoUpdateManyArgs>(args: SelectSubset<T, EventoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Evento.
     * @param {EventoUpsertArgs} args - Arguments to update or create a Evento.
     * @example
     * // Update or create a Evento
     * const evento = await prisma.evento.upsert({
     *   create: {
     *     // ... data to create a Evento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evento we want to update
     *   }
     * })
     */
    upsert<T extends EventoUpsertArgs>(args: SelectSubset<T, EventoUpsertArgs<ExtArgs>>): Prisma__EventoClient<$Result.GetResult<Prisma.$EventoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Eventos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoCountArgs} args - Arguments to filter Eventos to count.
     * @example
     * // Count the number of Eventos
     * const count = await prisma.evento.count({
     *   where: {
     *     // ... the filter for the Eventos we want to count
     *   }
     * })
    **/
    count<T extends EventoCountArgs>(
      args?: Subset<T, EventoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventoAggregateArgs>(args: Subset<T, EventoAggregateArgs>): Prisma.PrismaPromise<GetEventoAggregateType<T>>

    /**
     * Group by Evento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventoGroupByArgs['orderBy'] }
        : { orderBy?: EventoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evento model
   */
  readonly fields: EventoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evento model
   */ 
  interface EventoFieldRefs {
    readonly id: FieldRef<"Evento", 'Int'>
    readonly titulo: FieldRef<"Evento", 'String'>
    readonly descricao: FieldRef<"Evento", 'String'>
    readonly imagem: FieldRef<"Evento", 'String'>
    readonly dataEvento: FieldRef<"Evento", 'DateTime'>
    readonly dataFim: FieldRef<"Evento", 'DateTime'>
    readonly local: FieldRef<"Evento", 'String'>
    readonly organizador: FieldRef<"Evento", 'String'>
    readonly maxParticipantes: FieldRef<"Evento", 'Int'>
    readonly categoria: FieldRef<"Evento", 'String'>
    readonly criadoEm: FieldRef<"Evento", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Evento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Evento findUnique
   */
  export type EventoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter, which Evento to fetch.
     */
    where: EventoWhereUniqueInput
  }

  /**
   * Evento findUniqueOrThrow
   */
  export type EventoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter, which Evento to fetch.
     */
    where: EventoWhereUniqueInput
  }

  /**
   * Evento findFirst
   */
  export type EventoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter, which Evento to fetch.
     */
    where?: EventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eventos.
     */
    cursor?: EventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eventos.
     */
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[]
  }

  /**
   * Evento findFirstOrThrow
   */
  export type EventoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter, which Evento to fetch.
     */
    where?: EventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eventos.
     */
    cursor?: EventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eventos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eventos.
     */
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[]
  }

  /**
   * Evento findMany
   */
  export type EventoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter, which Eventos to fetch.
     */
    where?: EventoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eventos to fetch.
     */
    orderBy?: EventoOrderByWithRelationInput | EventoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eventos.
     */
    cursor?: EventoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eventos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eventos.
     */
    skip?: number
    distinct?: EventoScalarFieldEnum | EventoScalarFieldEnum[]
  }

  /**
   * Evento create
   */
  export type EventoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * The data needed to create a Evento.
     */
    data: XOR<EventoCreateInput, EventoUncheckedCreateInput>
  }

  /**
   * Evento createMany
   */
  export type EventoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eventos.
     */
    data: EventoCreateManyInput | EventoCreateManyInput[]
  }

  /**
   * Evento createManyAndReturn
   */
  export type EventoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Eventos.
     */
    data: EventoCreateManyInput | EventoCreateManyInput[]
  }

  /**
   * Evento update
   */
  export type EventoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * The data needed to update a Evento.
     */
    data: XOR<EventoUpdateInput, EventoUncheckedUpdateInput>
    /**
     * Choose, which Evento to update.
     */
    where: EventoWhereUniqueInput
  }

  /**
   * Evento updateMany
   */
  export type EventoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Eventos.
     */
    data: XOR<EventoUpdateManyMutationInput, EventoUncheckedUpdateManyInput>
    /**
     * Filter which Eventos to update
     */
    where?: EventoWhereInput
  }

  /**
   * Evento upsert
   */
  export type EventoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * The filter to search for the Evento to update in case it exists.
     */
    where: EventoWhereUniqueInput
    /**
     * In case the Evento found by the `where` argument doesn't exist, create a new Evento with this data.
     */
    create: XOR<EventoCreateInput, EventoUncheckedCreateInput>
    /**
     * In case the Evento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventoUpdateInput, EventoUncheckedUpdateInput>
  }

  /**
   * Evento delete
   */
  export type EventoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
    /**
     * Filter which Evento to delete.
     */
    where: EventoWhereUniqueInput
  }

  /**
   * Evento deleteMany
   */
  export type EventoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eventos to delete
     */
    where?: EventoWhereInput
  }

  /**
   * Evento without action
   */
  export type EventoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evento
     */
    select?: EventoSelect<ExtArgs> | null
  }


  /**
   * Model Reuniao
   */

  export type AggregateReuniao = {
    _count: ReuniaoCountAggregateOutputType | null
    _avg: ReuniaoAvgAggregateOutputType | null
    _sum: ReuniaoSumAggregateOutputType | null
    _min: ReuniaoMinAggregateOutputType | null
    _max: ReuniaoMaxAggregateOutputType | null
  }

  export type ReuniaoAvgAggregateOutputType = {
    id: number | null
    criadoPorId: number | null
  }

  export type ReuniaoSumAggregateOutputType = {
    id: number | null
    criadoPorId: number | null
  }

  export type ReuniaoMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    local: string | null
    linkMeeting: string | null
    dataHora: Date | null
    criadoPorId: number | null
    status: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ReuniaoMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    descricao: string | null
    local: string | null
    linkMeeting: string | null
    dataHora: Date | null
    criadoPorId: number | null
    status: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ReuniaoCountAggregateOutputType = {
    id: number
    titulo: number
    descricao: number
    local: number
    linkMeeting: number
    dataHora: number
    criadoPorId: number
    status: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type ReuniaoAvgAggregateInputType = {
    id?: true
    criadoPorId?: true
  }

  export type ReuniaoSumAggregateInputType = {
    id?: true
    criadoPorId?: true
  }

  export type ReuniaoMinAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    local?: true
    linkMeeting?: true
    dataHora?: true
    criadoPorId?: true
    status?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ReuniaoMaxAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    local?: true
    linkMeeting?: true
    dataHora?: true
    criadoPorId?: true
    status?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ReuniaoCountAggregateInputType = {
    id?: true
    titulo?: true
    descricao?: true
    local?: true
    linkMeeting?: true
    dataHora?: true
    criadoPorId?: true
    status?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type ReuniaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reuniao to aggregate.
     */
    where?: ReuniaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reuniaos to fetch.
     */
    orderBy?: ReuniaoOrderByWithRelationInput | ReuniaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReuniaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reuniaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reuniaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reuniaos
    **/
    _count?: true | ReuniaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReuniaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReuniaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReuniaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReuniaoMaxAggregateInputType
  }

  export type GetReuniaoAggregateType<T extends ReuniaoAggregateArgs> = {
        [P in keyof T & keyof AggregateReuniao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReuniao[P]>
      : GetScalarType<T[P], AggregateReuniao[P]>
  }




  export type ReuniaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReuniaoWhereInput
    orderBy?: ReuniaoOrderByWithAggregationInput | ReuniaoOrderByWithAggregationInput[]
    by: ReuniaoScalarFieldEnum[] | ReuniaoScalarFieldEnum
    having?: ReuniaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReuniaoCountAggregateInputType | true
    _avg?: ReuniaoAvgAggregateInputType
    _sum?: ReuniaoSumAggregateInputType
    _min?: ReuniaoMinAggregateInputType
    _max?: ReuniaoMaxAggregateInputType
  }

  export type ReuniaoGroupByOutputType = {
    id: number
    titulo: string
    descricao: string | null
    local: string
    linkMeeting: string | null
    dataHora: Date | null
    criadoPorId: number | null
    status: string
    criadoEm: Date
    atualizadoEm: Date
    _count: ReuniaoCountAggregateOutputType | null
    _avg: ReuniaoAvgAggregateOutputType | null
    _sum: ReuniaoSumAggregateOutputType | null
    _min: ReuniaoMinAggregateOutputType | null
    _max: ReuniaoMaxAggregateOutputType | null
  }

  type GetReuniaoGroupByPayload<T extends ReuniaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReuniaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReuniaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReuniaoGroupByOutputType[P]>
            : GetScalarType<T[P], ReuniaoGroupByOutputType[P]>
        }
      >
    >


  export type ReuniaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    local?: boolean
    linkMeeting?: boolean
    dataHora?: boolean
    criadoPorId?: boolean
    status?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    criadoPor?: boolean | Reuniao$criadoPorArgs<ExtArgs>
    participantes?: boolean | Reuniao$participantesArgs<ExtArgs>
    _count?: boolean | ReuniaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reuniao"]>

  export type ReuniaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    local?: boolean
    linkMeeting?: boolean
    dataHora?: boolean
    criadoPorId?: boolean
    status?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    criadoPor?: boolean | Reuniao$criadoPorArgs<ExtArgs>
  }, ExtArgs["result"]["reuniao"]>

  export type ReuniaoSelectScalar = {
    id?: boolean
    titulo?: boolean
    descricao?: boolean
    local?: boolean
    linkMeeting?: boolean
    dataHora?: boolean
    criadoPorId?: boolean
    status?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type ReuniaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    criadoPor?: boolean | Reuniao$criadoPorArgs<ExtArgs>
    participantes?: boolean | Reuniao$participantesArgs<ExtArgs>
    _count?: boolean | ReuniaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReuniaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    criadoPor?: boolean | Reuniao$criadoPorArgs<ExtArgs>
  }

  export type $ReuniaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reuniao"
    objects: {
      criadoPor: Prisma.$UsuarioPayload<ExtArgs> | null
      participantes: Prisma.$ReuniaoParticipantePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      descricao: string | null
      local: string
      linkMeeting: string | null
      dataHora: Date | null
      criadoPorId: number | null
      status: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["reuniao"]>
    composites: {}
  }

  type ReuniaoGetPayload<S extends boolean | null | undefined | ReuniaoDefaultArgs> = $Result.GetResult<Prisma.$ReuniaoPayload, S>

  type ReuniaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReuniaoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReuniaoCountAggregateInputType | true
    }

  export interface ReuniaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reuniao'], meta: { name: 'Reuniao' } }
    /**
     * Find zero or one Reuniao that matches the filter.
     * @param {ReuniaoFindUniqueArgs} args - Arguments to find a Reuniao
     * @example
     * // Get one Reuniao
     * const reuniao = await prisma.reuniao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReuniaoFindUniqueArgs>(args: SelectSubset<T, ReuniaoFindUniqueArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Reuniao that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReuniaoFindUniqueOrThrowArgs} args - Arguments to find a Reuniao
     * @example
     * // Get one Reuniao
     * const reuniao = await prisma.reuniao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReuniaoFindUniqueOrThrowArgs>(args: SelectSubset<T, ReuniaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Reuniao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoFindFirstArgs} args - Arguments to find a Reuniao
     * @example
     * // Get one Reuniao
     * const reuniao = await prisma.reuniao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReuniaoFindFirstArgs>(args?: SelectSubset<T, ReuniaoFindFirstArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Reuniao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoFindFirstOrThrowArgs} args - Arguments to find a Reuniao
     * @example
     * // Get one Reuniao
     * const reuniao = await prisma.reuniao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReuniaoFindFirstOrThrowArgs>(args?: SelectSubset<T, ReuniaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reuniaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reuniaos
     * const reuniaos = await prisma.reuniao.findMany()
     * 
     * // Get first 10 Reuniaos
     * const reuniaos = await prisma.reuniao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reuniaoWithIdOnly = await prisma.reuniao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReuniaoFindManyArgs>(args?: SelectSubset<T, ReuniaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Reuniao.
     * @param {ReuniaoCreateArgs} args - Arguments to create a Reuniao.
     * @example
     * // Create one Reuniao
     * const Reuniao = await prisma.reuniao.create({
     *   data: {
     *     // ... data to create a Reuniao
     *   }
     * })
     * 
     */
    create<T extends ReuniaoCreateArgs>(args: SelectSubset<T, ReuniaoCreateArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reuniaos.
     * @param {ReuniaoCreateManyArgs} args - Arguments to create many Reuniaos.
     * @example
     * // Create many Reuniaos
     * const reuniao = await prisma.reuniao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReuniaoCreateManyArgs>(args?: SelectSubset<T, ReuniaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reuniaos and returns the data saved in the database.
     * @param {ReuniaoCreateManyAndReturnArgs} args - Arguments to create many Reuniaos.
     * @example
     * // Create many Reuniaos
     * const reuniao = await prisma.reuniao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reuniaos and only return the `id`
     * const reuniaoWithIdOnly = await prisma.reuniao.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReuniaoCreateManyAndReturnArgs>(args?: SelectSubset<T, ReuniaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Reuniao.
     * @param {ReuniaoDeleteArgs} args - Arguments to delete one Reuniao.
     * @example
     * // Delete one Reuniao
     * const Reuniao = await prisma.reuniao.delete({
     *   where: {
     *     // ... filter to delete one Reuniao
     *   }
     * })
     * 
     */
    delete<T extends ReuniaoDeleteArgs>(args: SelectSubset<T, ReuniaoDeleteArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Reuniao.
     * @param {ReuniaoUpdateArgs} args - Arguments to update one Reuniao.
     * @example
     * // Update one Reuniao
     * const reuniao = await prisma.reuniao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReuniaoUpdateArgs>(args: SelectSubset<T, ReuniaoUpdateArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reuniaos.
     * @param {ReuniaoDeleteManyArgs} args - Arguments to filter Reuniaos to delete.
     * @example
     * // Delete a few Reuniaos
     * const { count } = await prisma.reuniao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReuniaoDeleteManyArgs>(args?: SelectSubset<T, ReuniaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reuniaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reuniaos
     * const reuniao = await prisma.reuniao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReuniaoUpdateManyArgs>(args: SelectSubset<T, ReuniaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reuniao.
     * @param {ReuniaoUpsertArgs} args - Arguments to update or create a Reuniao.
     * @example
     * // Update or create a Reuniao
     * const reuniao = await prisma.reuniao.upsert({
     *   create: {
     *     // ... data to create a Reuniao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reuniao we want to update
     *   }
     * })
     */
    upsert<T extends ReuniaoUpsertArgs>(args: SelectSubset<T, ReuniaoUpsertArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reuniaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoCountArgs} args - Arguments to filter Reuniaos to count.
     * @example
     * // Count the number of Reuniaos
     * const count = await prisma.reuniao.count({
     *   where: {
     *     // ... the filter for the Reuniaos we want to count
     *   }
     * })
    **/
    count<T extends ReuniaoCountArgs>(
      args?: Subset<T, ReuniaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReuniaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reuniao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReuniaoAggregateArgs>(args: Subset<T, ReuniaoAggregateArgs>): Prisma.PrismaPromise<GetReuniaoAggregateType<T>>

    /**
     * Group by Reuniao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReuniaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReuniaoGroupByArgs['orderBy'] }
        : { orderBy?: ReuniaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReuniaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReuniaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reuniao model
   */
  readonly fields: ReuniaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reuniao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReuniaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    criadoPor<T extends Reuniao$criadoPorArgs<ExtArgs> = {}>(args?: Subset<T, Reuniao$criadoPorArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    participantes<T extends Reuniao$participantesArgs<ExtArgs> = {}>(args?: Subset<T, Reuniao$participantesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reuniao model
   */ 
  interface ReuniaoFieldRefs {
    readonly id: FieldRef<"Reuniao", 'Int'>
    readonly titulo: FieldRef<"Reuniao", 'String'>
    readonly descricao: FieldRef<"Reuniao", 'String'>
    readonly local: FieldRef<"Reuniao", 'String'>
    readonly linkMeeting: FieldRef<"Reuniao", 'String'>
    readonly dataHora: FieldRef<"Reuniao", 'DateTime'>
    readonly criadoPorId: FieldRef<"Reuniao", 'Int'>
    readonly status: FieldRef<"Reuniao", 'String'>
    readonly criadoEm: FieldRef<"Reuniao", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Reuniao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reuniao findUnique
   */
  export type ReuniaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter, which Reuniao to fetch.
     */
    where: ReuniaoWhereUniqueInput
  }

  /**
   * Reuniao findUniqueOrThrow
   */
  export type ReuniaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter, which Reuniao to fetch.
     */
    where: ReuniaoWhereUniqueInput
  }

  /**
   * Reuniao findFirst
   */
  export type ReuniaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter, which Reuniao to fetch.
     */
    where?: ReuniaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reuniaos to fetch.
     */
    orderBy?: ReuniaoOrderByWithRelationInput | ReuniaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reuniaos.
     */
    cursor?: ReuniaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reuniaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reuniaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reuniaos.
     */
    distinct?: ReuniaoScalarFieldEnum | ReuniaoScalarFieldEnum[]
  }

  /**
   * Reuniao findFirstOrThrow
   */
  export type ReuniaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter, which Reuniao to fetch.
     */
    where?: ReuniaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reuniaos to fetch.
     */
    orderBy?: ReuniaoOrderByWithRelationInput | ReuniaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reuniaos.
     */
    cursor?: ReuniaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reuniaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reuniaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reuniaos.
     */
    distinct?: ReuniaoScalarFieldEnum | ReuniaoScalarFieldEnum[]
  }

  /**
   * Reuniao findMany
   */
  export type ReuniaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter, which Reuniaos to fetch.
     */
    where?: ReuniaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reuniaos to fetch.
     */
    orderBy?: ReuniaoOrderByWithRelationInput | ReuniaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reuniaos.
     */
    cursor?: ReuniaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reuniaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reuniaos.
     */
    skip?: number
    distinct?: ReuniaoScalarFieldEnum | ReuniaoScalarFieldEnum[]
  }

  /**
   * Reuniao create
   */
  export type ReuniaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Reuniao.
     */
    data: XOR<ReuniaoCreateInput, ReuniaoUncheckedCreateInput>
  }

  /**
   * Reuniao createMany
   */
  export type ReuniaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reuniaos.
     */
    data: ReuniaoCreateManyInput | ReuniaoCreateManyInput[]
  }

  /**
   * Reuniao createManyAndReturn
   */
  export type ReuniaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reuniaos.
     */
    data: ReuniaoCreateManyInput | ReuniaoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reuniao update
   */
  export type ReuniaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Reuniao.
     */
    data: XOR<ReuniaoUpdateInput, ReuniaoUncheckedUpdateInput>
    /**
     * Choose, which Reuniao to update.
     */
    where: ReuniaoWhereUniqueInput
  }

  /**
   * Reuniao updateMany
   */
  export type ReuniaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reuniaos.
     */
    data: XOR<ReuniaoUpdateManyMutationInput, ReuniaoUncheckedUpdateManyInput>
    /**
     * Filter which Reuniaos to update
     */
    where?: ReuniaoWhereInput
  }

  /**
   * Reuniao upsert
   */
  export type ReuniaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Reuniao to update in case it exists.
     */
    where: ReuniaoWhereUniqueInput
    /**
     * In case the Reuniao found by the `where` argument doesn't exist, create a new Reuniao with this data.
     */
    create: XOR<ReuniaoCreateInput, ReuniaoUncheckedCreateInput>
    /**
     * In case the Reuniao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReuniaoUpdateInput, ReuniaoUncheckedUpdateInput>
  }

  /**
   * Reuniao delete
   */
  export type ReuniaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
    /**
     * Filter which Reuniao to delete.
     */
    where: ReuniaoWhereUniqueInput
  }

  /**
   * Reuniao deleteMany
   */
  export type ReuniaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reuniaos to delete
     */
    where?: ReuniaoWhereInput
  }

  /**
   * Reuniao.criadoPor
   */
  export type Reuniao$criadoPorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Reuniao.participantes
   */
  export type Reuniao$participantesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    where?: ReuniaoParticipanteWhereInput
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    cursor?: ReuniaoParticipanteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReuniaoParticipanteScalarFieldEnum | ReuniaoParticipanteScalarFieldEnum[]
  }

  /**
   * Reuniao without action
   */
  export type ReuniaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reuniao
     */
    select?: ReuniaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoInclude<ExtArgs> | null
  }


  /**
   * Model ReuniaoParticipante
   */

  export type AggregateReuniaoParticipante = {
    _count: ReuniaoParticipanteCountAggregateOutputType | null
    _avg: ReuniaoParticipanteAvgAggregateOutputType | null
    _sum: ReuniaoParticipanteSumAggregateOutputType | null
    _min: ReuniaoParticipanteMinAggregateOutputType | null
    _max: ReuniaoParticipanteMaxAggregateOutputType | null
  }

  export type ReuniaoParticipanteAvgAggregateOutputType = {
    id: number | null
    reuniaoId: number | null
    usuarioId: number | null
  }

  export type ReuniaoParticipanteSumAggregateOutputType = {
    id: number | null
    reuniaoId: number | null
    usuarioId: number | null
  }

  export type ReuniaoParticipanteMinAggregateOutputType = {
    id: number | null
    reuniaoId: number | null
    usuarioId: number | null
    status: string | null
    confirmadoEm: Date | null
    criadoEm: Date | null
  }

  export type ReuniaoParticipanteMaxAggregateOutputType = {
    id: number | null
    reuniaoId: number | null
    usuarioId: number | null
    status: string | null
    confirmadoEm: Date | null
    criadoEm: Date | null
  }

  export type ReuniaoParticipanteCountAggregateOutputType = {
    id: number
    reuniaoId: number
    usuarioId: number
    status: number
    confirmadoEm: number
    criadoEm: number
    _all: number
  }


  export type ReuniaoParticipanteAvgAggregateInputType = {
    id?: true
    reuniaoId?: true
    usuarioId?: true
  }

  export type ReuniaoParticipanteSumAggregateInputType = {
    id?: true
    reuniaoId?: true
    usuarioId?: true
  }

  export type ReuniaoParticipanteMinAggregateInputType = {
    id?: true
    reuniaoId?: true
    usuarioId?: true
    status?: true
    confirmadoEm?: true
    criadoEm?: true
  }

  export type ReuniaoParticipanteMaxAggregateInputType = {
    id?: true
    reuniaoId?: true
    usuarioId?: true
    status?: true
    confirmadoEm?: true
    criadoEm?: true
  }

  export type ReuniaoParticipanteCountAggregateInputType = {
    id?: true
    reuniaoId?: true
    usuarioId?: true
    status?: true
    confirmadoEm?: true
    criadoEm?: true
    _all?: true
  }

  export type ReuniaoParticipanteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReuniaoParticipante to aggregate.
     */
    where?: ReuniaoParticipanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReuniaoParticipantes to fetch.
     */
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReuniaoParticipanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReuniaoParticipantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReuniaoParticipantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReuniaoParticipantes
    **/
    _count?: true | ReuniaoParticipanteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReuniaoParticipanteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReuniaoParticipanteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReuniaoParticipanteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReuniaoParticipanteMaxAggregateInputType
  }

  export type GetReuniaoParticipanteAggregateType<T extends ReuniaoParticipanteAggregateArgs> = {
        [P in keyof T & keyof AggregateReuniaoParticipante]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReuniaoParticipante[P]>
      : GetScalarType<T[P], AggregateReuniaoParticipante[P]>
  }




  export type ReuniaoParticipanteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReuniaoParticipanteWhereInput
    orderBy?: ReuniaoParticipanteOrderByWithAggregationInput | ReuniaoParticipanteOrderByWithAggregationInput[]
    by: ReuniaoParticipanteScalarFieldEnum[] | ReuniaoParticipanteScalarFieldEnum
    having?: ReuniaoParticipanteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReuniaoParticipanteCountAggregateInputType | true
    _avg?: ReuniaoParticipanteAvgAggregateInputType
    _sum?: ReuniaoParticipanteSumAggregateInputType
    _min?: ReuniaoParticipanteMinAggregateInputType
    _max?: ReuniaoParticipanteMaxAggregateInputType
  }

  export type ReuniaoParticipanteGroupByOutputType = {
    id: number
    reuniaoId: number
    usuarioId: number
    status: string
    confirmadoEm: Date | null
    criadoEm: Date
    _count: ReuniaoParticipanteCountAggregateOutputType | null
    _avg: ReuniaoParticipanteAvgAggregateOutputType | null
    _sum: ReuniaoParticipanteSumAggregateOutputType | null
    _min: ReuniaoParticipanteMinAggregateOutputType | null
    _max: ReuniaoParticipanteMaxAggregateOutputType | null
  }

  type GetReuniaoParticipanteGroupByPayload<T extends ReuniaoParticipanteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReuniaoParticipanteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReuniaoParticipanteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReuniaoParticipanteGroupByOutputType[P]>
            : GetScalarType<T[P], ReuniaoParticipanteGroupByOutputType[P]>
        }
      >
    >


  export type ReuniaoParticipanteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reuniaoId?: boolean
    usuarioId?: boolean
    status?: boolean
    confirmadoEm?: boolean
    criadoEm?: boolean
    reuniao?: boolean | ReuniaoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reuniaoParticipante"]>

  export type ReuniaoParticipanteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reuniaoId?: boolean
    usuarioId?: boolean
    status?: boolean
    confirmadoEm?: boolean
    criadoEm?: boolean
    reuniao?: boolean | ReuniaoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reuniaoParticipante"]>

  export type ReuniaoParticipanteSelectScalar = {
    id?: boolean
    reuniaoId?: boolean
    usuarioId?: boolean
    status?: boolean
    confirmadoEm?: boolean
    criadoEm?: boolean
  }

  export type ReuniaoParticipanteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reuniao?: boolean | ReuniaoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ReuniaoParticipanteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reuniao?: boolean | ReuniaoDefaultArgs<ExtArgs>
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ReuniaoParticipantePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReuniaoParticipante"
    objects: {
      reuniao: Prisma.$ReuniaoPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      reuniaoId: number
      usuarioId: number
      status: string
      confirmadoEm: Date | null
      criadoEm: Date
    }, ExtArgs["result"]["reuniaoParticipante"]>
    composites: {}
  }

  type ReuniaoParticipanteGetPayload<S extends boolean | null | undefined | ReuniaoParticipanteDefaultArgs> = $Result.GetResult<Prisma.$ReuniaoParticipantePayload, S>

  type ReuniaoParticipanteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReuniaoParticipanteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReuniaoParticipanteCountAggregateInputType | true
    }

  export interface ReuniaoParticipanteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReuniaoParticipante'], meta: { name: 'ReuniaoParticipante' } }
    /**
     * Find zero or one ReuniaoParticipante that matches the filter.
     * @param {ReuniaoParticipanteFindUniqueArgs} args - Arguments to find a ReuniaoParticipante
     * @example
     * // Get one ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReuniaoParticipanteFindUniqueArgs>(args: SelectSubset<T, ReuniaoParticipanteFindUniqueArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReuniaoParticipante that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReuniaoParticipanteFindUniqueOrThrowArgs} args - Arguments to find a ReuniaoParticipante
     * @example
     * // Get one ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReuniaoParticipanteFindUniqueOrThrowArgs>(args: SelectSubset<T, ReuniaoParticipanteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReuniaoParticipante that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteFindFirstArgs} args - Arguments to find a ReuniaoParticipante
     * @example
     * // Get one ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReuniaoParticipanteFindFirstArgs>(args?: SelectSubset<T, ReuniaoParticipanteFindFirstArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReuniaoParticipante that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteFindFirstOrThrowArgs} args - Arguments to find a ReuniaoParticipante
     * @example
     * // Get one ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReuniaoParticipanteFindFirstOrThrowArgs>(args?: SelectSubset<T, ReuniaoParticipanteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReuniaoParticipantes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReuniaoParticipantes
     * const reuniaoParticipantes = await prisma.reuniaoParticipante.findMany()
     * 
     * // Get first 10 ReuniaoParticipantes
     * const reuniaoParticipantes = await prisma.reuniaoParticipante.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reuniaoParticipanteWithIdOnly = await prisma.reuniaoParticipante.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReuniaoParticipanteFindManyArgs>(args?: SelectSubset<T, ReuniaoParticipanteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReuniaoParticipante.
     * @param {ReuniaoParticipanteCreateArgs} args - Arguments to create a ReuniaoParticipante.
     * @example
     * // Create one ReuniaoParticipante
     * const ReuniaoParticipante = await prisma.reuniaoParticipante.create({
     *   data: {
     *     // ... data to create a ReuniaoParticipante
     *   }
     * })
     * 
     */
    create<T extends ReuniaoParticipanteCreateArgs>(args: SelectSubset<T, ReuniaoParticipanteCreateArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReuniaoParticipantes.
     * @param {ReuniaoParticipanteCreateManyArgs} args - Arguments to create many ReuniaoParticipantes.
     * @example
     * // Create many ReuniaoParticipantes
     * const reuniaoParticipante = await prisma.reuniaoParticipante.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReuniaoParticipanteCreateManyArgs>(args?: SelectSubset<T, ReuniaoParticipanteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReuniaoParticipantes and returns the data saved in the database.
     * @param {ReuniaoParticipanteCreateManyAndReturnArgs} args - Arguments to create many ReuniaoParticipantes.
     * @example
     * // Create many ReuniaoParticipantes
     * const reuniaoParticipante = await prisma.reuniaoParticipante.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReuniaoParticipantes and only return the `id`
     * const reuniaoParticipanteWithIdOnly = await prisma.reuniaoParticipante.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReuniaoParticipanteCreateManyAndReturnArgs>(args?: SelectSubset<T, ReuniaoParticipanteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReuniaoParticipante.
     * @param {ReuniaoParticipanteDeleteArgs} args - Arguments to delete one ReuniaoParticipante.
     * @example
     * // Delete one ReuniaoParticipante
     * const ReuniaoParticipante = await prisma.reuniaoParticipante.delete({
     *   where: {
     *     // ... filter to delete one ReuniaoParticipante
     *   }
     * })
     * 
     */
    delete<T extends ReuniaoParticipanteDeleteArgs>(args: SelectSubset<T, ReuniaoParticipanteDeleteArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReuniaoParticipante.
     * @param {ReuniaoParticipanteUpdateArgs} args - Arguments to update one ReuniaoParticipante.
     * @example
     * // Update one ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReuniaoParticipanteUpdateArgs>(args: SelectSubset<T, ReuniaoParticipanteUpdateArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReuniaoParticipantes.
     * @param {ReuniaoParticipanteDeleteManyArgs} args - Arguments to filter ReuniaoParticipantes to delete.
     * @example
     * // Delete a few ReuniaoParticipantes
     * const { count } = await prisma.reuniaoParticipante.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReuniaoParticipanteDeleteManyArgs>(args?: SelectSubset<T, ReuniaoParticipanteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReuniaoParticipantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReuniaoParticipantes
     * const reuniaoParticipante = await prisma.reuniaoParticipante.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReuniaoParticipanteUpdateManyArgs>(args: SelectSubset<T, ReuniaoParticipanteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReuniaoParticipante.
     * @param {ReuniaoParticipanteUpsertArgs} args - Arguments to update or create a ReuniaoParticipante.
     * @example
     * // Update or create a ReuniaoParticipante
     * const reuniaoParticipante = await prisma.reuniaoParticipante.upsert({
     *   create: {
     *     // ... data to create a ReuniaoParticipante
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReuniaoParticipante we want to update
     *   }
     * })
     */
    upsert<T extends ReuniaoParticipanteUpsertArgs>(args: SelectSubset<T, ReuniaoParticipanteUpsertArgs<ExtArgs>>): Prisma__ReuniaoParticipanteClient<$Result.GetResult<Prisma.$ReuniaoParticipantePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReuniaoParticipantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteCountArgs} args - Arguments to filter ReuniaoParticipantes to count.
     * @example
     * // Count the number of ReuniaoParticipantes
     * const count = await prisma.reuniaoParticipante.count({
     *   where: {
     *     // ... the filter for the ReuniaoParticipantes we want to count
     *   }
     * })
    **/
    count<T extends ReuniaoParticipanteCountArgs>(
      args?: Subset<T, ReuniaoParticipanteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReuniaoParticipanteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReuniaoParticipante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReuniaoParticipanteAggregateArgs>(args: Subset<T, ReuniaoParticipanteAggregateArgs>): Prisma.PrismaPromise<GetReuniaoParticipanteAggregateType<T>>

    /**
     * Group by ReuniaoParticipante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReuniaoParticipanteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReuniaoParticipanteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReuniaoParticipanteGroupByArgs['orderBy'] }
        : { orderBy?: ReuniaoParticipanteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReuniaoParticipanteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReuniaoParticipanteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReuniaoParticipante model
   */
  readonly fields: ReuniaoParticipanteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReuniaoParticipante.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReuniaoParticipanteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reuniao<T extends ReuniaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReuniaoDefaultArgs<ExtArgs>>): Prisma__ReuniaoClient<$Result.GetResult<Prisma.$ReuniaoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReuniaoParticipante model
   */ 
  interface ReuniaoParticipanteFieldRefs {
    readonly id: FieldRef<"ReuniaoParticipante", 'Int'>
    readonly reuniaoId: FieldRef<"ReuniaoParticipante", 'Int'>
    readonly usuarioId: FieldRef<"ReuniaoParticipante", 'Int'>
    readonly status: FieldRef<"ReuniaoParticipante", 'String'>
    readonly confirmadoEm: FieldRef<"ReuniaoParticipante", 'DateTime'>
    readonly criadoEm: FieldRef<"ReuniaoParticipante", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReuniaoParticipante findUnique
   */
  export type ReuniaoParticipanteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter, which ReuniaoParticipante to fetch.
     */
    where: ReuniaoParticipanteWhereUniqueInput
  }

  /**
   * ReuniaoParticipante findUniqueOrThrow
   */
  export type ReuniaoParticipanteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter, which ReuniaoParticipante to fetch.
     */
    where: ReuniaoParticipanteWhereUniqueInput
  }

  /**
   * ReuniaoParticipante findFirst
   */
  export type ReuniaoParticipanteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter, which ReuniaoParticipante to fetch.
     */
    where?: ReuniaoParticipanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReuniaoParticipantes to fetch.
     */
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReuniaoParticipantes.
     */
    cursor?: ReuniaoParticipanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReuniaoParticipantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReuniaoParticipantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReuniaoParticipantes.
     */
    distinct?: ReuniaoParticipanteScalarFieldEnum | ReuniaoParticipanteScalarFieldEnum[]
  }

  /**
   * ReuniaoParticipante findFirstOrThrow
   */
  export type ReuniaoParticipanteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter, which ReuniaoParticipante to fetch.
     */
    where?: ReuniaoParticipanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReuniaoParticipantes to fetch.
     */
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReuniaoParticipantes.
     */
    cursor?: ReuniaoParticipanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReuniaoParticipantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReuniaoParticipantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReuniaoParticipantes.
     */
    distinct?: ReuniaoParticipanteScalarFieldEnum | ReuniaoParticipanteScalarFieldEnum[]
  }

  /**
   * ReuniaoParticipante findMany
   */
  export type ReuniaoParticipanteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter, which ReuniaoParticipantes to fetch.
     */
    where?: ReuniaoParticipanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReuniaoParticipantes to fetch.
     */
    orderBy?: ReuniaoParticipanteOrderByWithRelationInput | ReuniaoParticipanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReuniaoParticipantes.
     */
    cursor?: ReuniaoParticipanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReuniaoParticipantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReuniaoParticipantes.
     */
    skip?: number
    distinct?: ReuniaoParticipanteScalarFieldEnum | ReuniaoParticipanteScalarFieldEnum[]
  }

  /**
   * ReuniaoParticipante create
   */
  export type ReuniaoParticipanteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * The data needed to create a ReuniaoParticipante.
     */
    data: XOR<ReuniaoParticipanteCreateInput, ReuniaoParticipanteUncheckedCreateInput>
  }

  /**
   * ReuniaoParticipante createMany
   */
  export type ReuniaoParticipanteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReuniaoParticipantes.
     */
    data: ReuniaoParticipanteCreateManyInput | ReuniaoParticipanteCreateManyInput[]
  }

  /**
   * ReuniaoParticipante createManyAndReturn
   */
  export type ReuniaoParticipanteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReuniaoParticipantes.
     */
    data: ReuniaoParticipanteCreateManyInput | ReuniaoParticipanteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReuniaoParticipante update
   */
  export type ReuniaoParticipanteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * The data needed to update a ReuniaoParticipante.
     */
    data: XOR<ReuniaoParticipanteUpdateInput, ReuniaoParticipanteUncheckedUpdateInput>
    /**
     * Choose, which ReuniaoParticipante to update.
     */
    where: ReuniaoParticipanteWhereUniqueInput
  }

  /**
   * ReuniaoParticipante updateMany
   */
  export type ReuniaoParticipanteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReuniaoParticipantes.
     */
    data: XOR<ReuniaoParticipanteUpdateManyMutationInput, ReuniaoParticipanteUncheckedUpdateManyInput>
    /**
     * Filter which ReuniaoParticipantes to update
     */
    where?: ReuniaoParticipanteWhereInput
  }

  /**
   * ReuniaoParticipante upsert
   */
  export type ReuniaoParticipanteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * The filter to search for the ReuniaoParticipante to update in case it exists.
     */
    where: ReuniaoParticipanteWhereUniqueInput
    /**
     * In case the ReuniaoParticipante found by the `where` argument doesn't exist, create a new ReuniaoParticipante with this data.
     */
    create: XOR<ReuniaoParticipanteCreateInput, ReuniaoParticipanteUncheckedCreateInput>
    /**
     * In case the ReuniaoParticipante was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReuniaoParticipanteUpdateInput, ReuniaoParticipanteUncheckedUpdateInput>
  }

  /**
   * ReuniaoParticipante delete
   */
  export type ReuniaoParticipanteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
    /**
     * Filter which ReuniaoParticipante to delete.
     */
    where: ReuniaoParticipanteWhereUniqueInput
  }

  /**
   * ReuniaoParticipante deleteMany
   */
  export type ReuniaoParticipanteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReuniaoParticipantes to delete
     */
    where?: ReuniaoParticipanteWhereInput
  }

  /**
   * ReuniaoParticipante without action
   */
  export type ReuniaoParticipanteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReuniaoParticipante
     */
    select?: ReuniaoParticipanteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReuniaoParticipanteInclude<ExtArgs> | null
  }


  /**
   * Model Relatorio
   */

  export type AggregateRelatorio = {
    _count: RelatorioCountAggregateOutputType | null
    _avg: RelatorioAvgAggregateOutputType | null
    _sum: RelatorioSumAggregateOutputType | null
    _min: RelatorioMinAggregateOutputType | null
    _max: RelatorioMaxAggregateOutputType | null
  }

  export type RelatorioAvgAggregateOutputType = {
    id: number | null
    autorId: number | null
  }

  export type RelatorioSumAggregateOutputType = {
    id: number | null
    autorId: number | null
  }

  export type RelatorioMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    conteudo: string | null
    tipo: string | null
    autorId: number | null
    dataReferencia: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type RelatorioMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    conteudo: string | null
    tipo: string | null
    autorId: number | null
    dataReferencia: Date | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type RelatorioCountAggregateOutputType = {
    id: number
    titulo: number
    conteudo: number
    tipo: number
    autorId: number
    dataReferencia: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type RelatorioAvgAggregateInputType = {
    id?: true
    autorId?: true
  }

  export type RelatorioSumAggregateInputType = {
    id?: true
    autorId?: true
  }

  export type RelatorioMinAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    tipo?: true
    autorId?: true
    dataReferencia?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type RelatorioMaxAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    tipo?: true
    autorId?: true
    dataReferencia?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type RelatorioCountAggregateInputType = {
    id?: true
    titulo?: true
    conteudo?: true
    tipo?: true
    autorId?: true
    dataReferencia?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type RelatorioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relatorio to aggregate.
     */
    where?: RelatorioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relatorios to fetch.
     */
    orderBy?: RelatorioOrderByWithRelationInput | RelatorioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RelatorioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relatorios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relatorios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Relatorios
    **/
    _count?: true | RelatorioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RelatorioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RelatorioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RelatorioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RelatorioMaxAggregateInputType
  }

  export type GetRelatorioAggregateType<T extends RelatorioAggregateArgs> = {
        [P in keyof T & keyof AggregateRelatorio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRelatorio[P]>
      : GetScalarType<T[P], AggregateRelatorio[P]>
  }




  export type RelatorioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelatorioWhereInput
    orderBy?: RelatorioOrderByWithAggregationInput | RelatorioOrderByWithAggregationInput[]
    by: RelatorioScalarFieldEnum[] | RelatorioScalarFieldEnum
    having?: RelatorioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RelatorioCountAggregateInputType | true
    _avg?: RelatorioAvgAggregateInputType
    _sum?: RelatorioSumAggregateInputType
    _min?: RelatorioMinAggregateInputType
    _max?: RelatorioMaxAggregateInputType
  }

  export type RelatorioGroupByOutputType = {
    id: number
    titulo: string
    conteudo: string
    tipo: string
    autorId: number | null
    dataReferencia: Date | null
    criadoEm: Date
    atualizadoEm: Date
    _count: RelatorioCountAggregateOutputType | null
    _avg: RelatorioAvgAggregateOutputType | null
    _sum: RelatorioSumAggregateOutputType | null
    _min: RelatorioMinAggregateOutputType | null
    _max: RelatorioMaxAggregateOutputType | null
  }

  type GetRelatorioGroupByPayload<T extends RelatorioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RelatorioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RelatorioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RelatorioGroupByOutputType[P]>
            : GetScalarType<T[P], RelatorioGroupByOutputType[P]>
        }
      >
    >


  export type RelatorioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    tipo?: boolean
    autorId?: boolean
    dataReferencia?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["relatorio"]>

  export type RelatorioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    tipo?: boolean
    autorId?: boolean
    dataReferencia?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["relatorio"]>

  export type RelatorioSelectScalar = {
    id?: boolean
    titulo?: boolean
    conteudo?: boolean
    tipo?: boolean
    autorId?: boolean
    dataReferencia?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }


  export type $RelatorioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Relatorio"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      conteudo: string
      tipo: string
      autorId: number | null
      dataReferencia: Date | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["relatorio"]>
    composites: {}
  }

  type RelatorioGetPayload<S extends boolean | null | undefined | RelatorioDefaultArgs> = $Result.GetResult<Prisma.$RelatorioPayload, S>

  type RelatorioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RelatorioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RelatorioCountAggregateInputType | true
    }

  export interface RelatorioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Relatorio'], meta: { name: 'Relatorio' } }
    /**
     * Find zero or one Relatorio that matches the filter.
     * @param {RelatorioFindUniqueArgs} args - Arguments to find a Relatorio
     * @example
     * // Get one Relatorio
     * const relatorio = await prisma.relatorio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RelatorioFindUniqueArgs>(args: SelectSubset<T, RelatorioFindUniqueArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Relatorio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RelatorioFindUniqueOrThrowArgs} args - Arguments to find a Relatorio
     * @example
     * // Get one Relatorio
     * const relatorio = await prisma.relatorio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RelatorioFindUniqueOrThrowArgs>(args: SelectSubset<T, RelatorioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Relatorio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioFindFirstArgs} args - Arguments to find a Relatorio
     * @example
     * // Get one Relatorio
     * const relatorio = await prisma.relatorio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RelatorioFindFirstArgs>(args?: SelectSubset<T, RelatorioFindFirstArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Relatorio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioFindFirstOrThrowArgs} args - Arguments to find a Relatorio
     * @example
     * // Get one Relatorio
     * const relatorio = await prisma.relatorio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RelatorioFindFirstOrThrowArgs>(args?: SelectSubset<T, RelatorioFindFirstOrThrowArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Relatorios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Relatorios
     * const relatorios = await prisma.relatorio.findMany()
     * 
     * // Get first 10 Relatorios
     * const relatorios = await prisma.relatorio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const relatorioWithIdOnly = await prisma.relatorio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RelatorioFindManyArgs>(args?: SelectSubset<T, RelatorioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Relatorio.
     * @param {RelatorioCreateArgs} args - Arguments to create a Relatorio.
     * @example
     * // Create one Relatorio
     * const Relatorio = await prisma.relatorio.create({
     *   data: {
     *     // ... data to create a Relatorio
     *   }
     * })
     * 
     */
    create<T extends RelatorioCreateArgs>(args: SelectSubset<T, RelatorioCreateArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Relatorios.
     * @param {RelatorioCreateManyArgs} args - Arguments to create many Relatorios.
     * @example
     * // Create many Relatorios
     * const relatorio = await prisma.relatorio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RelatorioCreateManyArgs>(args?: SelectSubset<T, RelatorioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Relatorios and returns the data saved in the database.
     * @param {RelatorioCreateManyAndReturnArgs} args - Arguments to create many Relatorios.
     * @example
     * // Create many Relatorios
     * const relatorio = await prisma.relatorio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Relatorios and only return the `id`
     * const relatorioWithIdOnly = await prisma.relatorio.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RelatorioCreateManyAndReturnArgs>(args?: SelectSubset<T, RelatorioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Relatorio.
     * @param {RelatorioDeleteArgs} args - Arguments to delete one Relatorio.
     * @example
     * // Delete one Relatorio
     * const Relatorio = await prisma.relatorio.delete({
     *   where: {
     *     // ... filter to delete one Relatorio
     *   }
     * })
     * 
     */
    delete<T extends RelatorioDeleteArgs>(args: SelectSubset<T, RelatorioDeleteArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Relatorio.
     * @param {RelatorioUpdateArgs} args - Arguments to update one Relatorio.
     * @example
     * // Update one Relatorio
     * const relatorio = await prisma.relatorio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RelatorioUpdateArgs>(args: SelectSubset<T, RelatorioUpdateArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Relatorios.
     * @param {RelatorioDeleteManyArgs} args - Arguments to filter Relatorios to delete.
     * @example
     * // Delete a few Relatorios
     * const { count } = await prisma.relatorio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RelatorioDeleteManyArgs>(args?: SelectSubset<T, RelatorioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Relatorios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Relatorios
     * const relatorio = await prisma.relatorio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RelatorioUpdateManyArgs>(args: SelectSubset<T, RelatorioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Relatorio.
     * @param {RelatorioUpsertArgs} args - Arguments to update or create a Relatorio.
     * @example
     * // Update or create a Relatorio
     * const relatorio = await prisma.relatorio.upsert({
     *   create: {
     *     // ... data to create a Relatorio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Relatorio we want to update
     *   }
     * })
     */
    upsert<T extends RelatorioUpsertArgs>(args: SelectSubset<T, RelatorioUpsertArgs<ExtArgs>>): Prisma__RelatorioClient<$Result.GetResult<Prisma.$RelatorioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Relatorios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioCountArgs} args - Arguments to filter Relatorios to count.
     * @example
     * // Count the number of Relatorios
     * const count = await prisma.relatorio.count({
     *   where: {
     *     // ... the filter for the Relatorios we want to count
     *   }
     * })
    **/
    count<T extends RelatorioCountArgs>(
      args?: Subset<T, RelatorioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RelatorioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Relatorio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RelatorioAggregateArgs>(args: Subset<T, RelatorioAggregateArgs>): Prisma.PrismaPromise<GetRelatorioAggregateType<T>>

    /**
     * Group by Relatorio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelatorioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RelatorioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RelatorioGroupByArgs['orderBy'] }
        : { orderBy?: RelatorioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RelatorioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRelatorioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Relatorio model
   */
  readonly fields: RelatorioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Relatorio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RelatorioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Relatorio model
   */ 
  interface RelatorioFieldRefs {
    readonly id: FieldRef<"Relatorio", 'Int'>
    readonly titulo: FieldRef<"Relatorio", 'String'>
    readonly conteudo: FieldRef<"Relatorio", 'String'>
    readonly tipo: FieldRef<"Relatorio", 'String'>
    readonly autorId: FieldRef<"Relatorio", 'Int'>
    readonly dataReferencia: FieldRef<"Relatorio", 'DateTime'>
    readonly criadoEm: FieldRef<"Relatorio", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Relatorio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Relatorio findUnique
   */
  export type RelatorioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter, which Relatorio to fetch.
     */
    where: RelatorioWhereUniqueInput
  }

  /**
   * Relatorio findUniqueOrThrow
   */
  export type RelatorioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter, which Relatorio to fetch.
     */
    where: RelatorioWhereUniqueInput
  }

  /**
   * Relatorio findFirst
   */
  export type RelatorioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter, which Relatorio to fetch.
     */
    where?: RelatorioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relatorios to fetch.
     */
    orderBy?: RelatorioOrderByWithRelationInput | RelatorioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relatorios.
     */
    cursor?: RelatorioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relatorios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relatorios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relatorios.
     */
    distinct?: RelatorioScalarFieldEnum | RelatorioScalarFieldEnum[]
  }

  /**
   * Relatorio findFirstOrThrow
   */
  export type RelatorioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter, which Relatorio to fetch.
     */
    where?: RelatorioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relatorios to fetch.
     */
    orderBy?: RelatorioOrderByWithRelationInput | RelatorioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relatorios.
     */
    cursor?: RelatorioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relatorios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relatorios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relatorios.
     */
    distinct?: RelatorioScalarFieldEnum | RelatorioScalarFieldEnum[]
  }

  /**
   * Relatorio findMany
   */
  export type RelatorioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter, which Relatorios to fetch.
     */
    where?: RelatorioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relatorios to fetch.
     */
    orderBy?: RelatorioOrderByWithRelationInput | RelatorioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Relatorios.
     */
    cursor?: RelatorioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relatorios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relatorios.
     */
    skip?: number
    distinct?: RelatorioScalarFieldEnum | RelatorioScalarFieldEnum[]
  }

  /**
   * Relatorio create
   */
  export type RelatorioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * The data needed to create a Relatorio.
     */
    data: XOR<RelatorioCreateInput, RelatorioUncheckedCreateInput>
  }

  /**
   * Relatorio createMany
   */
  export type RelatorioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Relatorios.
     */
    data: RelatorioCreateManyInput | RelatorioCreateManyInput[]
  }

  /**
   * Relatorio createManyAndReturn
   */
  export type RelatorioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Relatorios.
     */
    data: RelatorioCreateManyInput | RelatorioCreateManyInput[]
  }

  /**
   * Relatorio update
   */
  export type RelatorioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * The data needed to update a Relatorio.
     */
    data: XOR<RelatorioUpdateInput, RelatorioUncheckedUpdateInput>
    /**
     * Choose, which Relatorio to update.
     */
    where: RelatorioWhereUniqueInput
  }

  /**
   * Relatorio updateMany
   */
  export type RelatorioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Relatorios.
     */
    data: XOR<RelatorioUpdateManyMutationInput, RelatorioUncheckedUpdateManyInput>
    /**
     * Filter which Relatorios to update
     */
    where?: RelatorioWhereInput
  }

  /**
   * Relatorio upsert
   */
  export type RelatorioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * The filter to search for the Relatorio to update in case it exists.
     */
    where: RelatorioWhereUniqueInput
    /**
     * In case the Relatorio found by the `where` argument doesn't exist, create a new Relatorio with this data.
     */
    create: XOR<RelatorioCreateInput, RelatorioUncheckedCreateInput>
    /**
     * In case the Relatorio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RelatorioUpdateInput, RelatorioUncheckedUpdateInput>
  }

  /**
   * Relatorio delete
   */
  export type RelatorioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
    /**
     * Filter which Relatorio to delete.
     */
    where: RelatorioWhereUniqueInput
  }

  /**
   * Relatorio deleteMany
   */
  export type RelatorioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relatorios to delete
     */
    where?: RelatorioWhereInput
  }

  /**
   * Relatorio without action
   */
  export type RelatorioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relatorio
     */
    select?: RelatorioSelect<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    id: number | null
    avaliacao: number | null
    usuarioId: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    id: number | null
    avaliacao: number | null
    usuarioId: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    assunto: string | null
    mensagem: string | null
    avaliacao: number | null
    categoria: string | null
    status: string | null
    resposta: string | null
    respondidoEm: Date | null
    usuarioId: number | null
    criadoEm: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    assunto: string | null
    mensagem: string | null
    avaliacao: number | null
    categoria: string | null
    status: string | null
    resposta: string | null
    respondidoEm: Date | null
    usuarioId: number | null
    criadoEm: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    assunto: number
    mensagem: number
    avaliacao: number
    categoria: number
    status: number
    resposta: number
    respondidoEm: number
    usuarioId: number
    criadoEm: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    id?: true
    avaliacao?: true
    usuarioId?: true
  }

  export type FeedbackSumAggregateInputType = {
    id?: true
    avaliacao?: true
    usuarioId?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    assunto?: true
    mensagem?: true
    avaliacao?: true
    categoria?: true
    status?: true
    resposta?: true
    respondidoEm?: true
    usuarioId?: true
    criadoEm?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    assunto?: true
    mensagem?: true
    avaliacao?: true
    categoria?: true
    status?: true
    resposta?: true
    respondidoEm?: true
    usuarioId?: true
    criadoEm?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    assunto?: true
    mensagem?: true
    avaliacao?: true
    categoria?: true
    status?: true
    resposta?: true
    respondidoEm?: true
    usuarioId?: true
    criadoEm?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: number
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao: number | null
    categoria: string
    status: string
    resposta: string | null
    respondidoEm: Date | null
    usuarioId: number | null
    criadoEm: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    assunto?: boolean
    mensagem?: boolean
    avaliacao?: boolean
    categoria?: boolean
    status?: boolean
    resposta?: boolean
    respondidoEm?: boolean
    usuarioId?: boolean
    criadoEm?: boolean
    usuario?: boolean | Feedback$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    assunto?: boolean
    mensagem?: boolean
    avaliacao?: boolean
    categoria?: boolean
    status?: boolean
    resposta?: boolean
    respondidoEm?: boolean
    usuarioId?: boolean
    criadoEm?: boolean
    usuario?: boolean | Feedback$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    assunto?: boolean
    mensagem?: boolean
    avaliacao?: boolean
    categoria?: boolean
    status?: boolean
    resposta?: boolean
    respondidoEm?: boolean
    usuarioId?: boolean
    criadoEm?: boolean
  }

  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Feedback$usuarioArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Feedback$usuarioArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string
      assunto: string
      mensagem: string
      avaliacao: number | null
      categoria: string
      status: string
      resposta: string | null
      respondidoEm: Date | null
      usuarioId: number | null
      criadoEm: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends Feedback$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, Feedback$usuarioArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */ 
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'Int'>
    readonly nome: FieldRef<"Feedback", 'String'>
    readonly email: FieldRef<"Feedback", 'String'>
    readonly assunto: FieldRef<"Feedback", 'String'>
    readonly mensagem: FieldRef<"Feedback", 'String'>
    readonly avaliacao: FieldRef<"Feedback", 'Int'>
    readonly categoria: FieldRef<"Feedback", 'String'>
    readonly status: FieldRef<"Feedback", 'String'>
    readonly resposta: FieldRef<"Feedback", 'String'>
    readonly respondidoEm: FieldRef<"Feedback", 'DateTime'>
    readonly usuarioId: FieldRef<"Feedback", 'Int'>
    readonly criadoEm: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
  }

  /**
   * Feedback.usuario
   */
  export type Feedback$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model CodigoProfessor
   */

  export type AggregateCodigoProfessor = {
    _count: CodigoProfessorCountAggregateOutputType | null
    _avg: CodigoProfessorAvgAggregateOutputType | null
    _sum: CodigoProfessorSumAggregateOutputType | null
    _min: CodigoProfessorMinAggregateOutputType | null
    _max: CodigoProfessorMaxAggregateOutputType | null
  }

  export type CodigoProfessorAvgAggregateOutputType = {
    id: number | null
    professorId: number | null
  }

  export type CodigoProfessorSumAggregateOutputType = {
    id: number | null
    professorId: number | null
  }

  export type CodigoProfessorMinAggregateOutputType = {
    id: number | null
    codigo: string | null
    usado: boolean | null
    professorId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CodigoProfessorMaxAggregateOutputType = {
    id: number | null
    codigo: string | null
    usado: boolean | null
    professorId: number | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CodigoProfessorCountAggregateOutputType = {
    id: number
    codigo: number
    usado: number
    professorId: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CodigoProfessorAvgAggregateInputType = {
    id?: true
    professorId?: true
  }

  export type CodigoProfessorSumAggregateInputType = {
    id?: true
    professorId?: true
  }

  export type CodigoProfessorMinAggregateInputType = {
    id?: true
    codigo?: true
    usado?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CodigoProfessorMaxAggregateInputType = {
    id?: true
    codigo?: true
    usado?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CodigoProfessorCountAggregateInputType = {
    id?: true
    codigo?: true
    usado?: true
    professorId?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CodigoProfessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodigoProfessor to aggregate.
     */
    where?: CodigoProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodigoProfessors to fetch.
     */
    orderBy?: CodigoProfessorOrderByWithRelationInput | CodigoProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodigoProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodigoProfessors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodigoProfessors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CodigoProfessors
    **/
    _count?: true | CodigoProfessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CodigoProfessorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CodigoProfessorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodigoProfessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodigoProfessorMaxAggregateInputType
  }

  export type GetCodigoProfessorAggregateType<T extends CodigoProfessorAggregateArgs> = {
        [P in keyof T & keyof AggregateCodigoProfessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodigoProfessor[P]>
      : GetScalarType<T[P], AggregateCodigoProfessor[P]>
  }




  export type CodigoProfessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodigoProfessorWhereInput
    orderBy?: CodigoProfessorOrderByWithAggregationInput | CodigoProfessorOrderByWithAggregationInput[]
    by: CodigoProfessorScalarFieldEnum[] | CodigoProfessorScalarFieldEnum
    having?: CodigoProfessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodigoProfessorCountAggregateInputType | true
    _avg?: CodigoProfessorAvgAggregateInputType
    _sum?: CodigoProfessorSumAggregateInputType
    _min?: CodigoProfessorMinAggregateInputType
    _max?: CodigoProfessorMaxAggregateInputType
  }

  export type CodigoProfessorGroupByOutputType = {
    id: number
    codigo: string
    usado: boolean
    professorId: number | null
    criadoEm: Date
    atualizadoEm: Date
    _count: CodigoProfessorCountAggregateOutputType | null
    _avg: CodigoProfessorAvgAggregateOutputType | null
    _sum: CodigoProfessorSumAggregateOutputType | null
    _min: CodigoProfessorMinAggregateOutputType | null
    _max: CodigoProfessorMaxAggregateOutputType | null
  }

  type GetCodigoProfessorGroupByPayload<T extends CodigoProfessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodigoProfessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodigoProfessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodigoProfessorGroupByOutputType[P]>
            : GetScalarType<T[P], CodigoProfessorGroupByOutputType[P]>
        }
      >
    >


  export type CodigoProfessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    usado?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    professor?: boolean | CodigoProfessor$professorArgs<ExtArgs>
  }, ExtArgs["result"]["codigoProfessor"]>

  export type CodigoProfessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    usado?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    professor?: boolean | CodigoProfessor$professorArgs<ExtArgs>
  }, ExtArgs["result"]["codigoProfessor"]>

  export type CodigoProfessorSelectScalar = {
    id?: boolean
    codigo?: boolean
    usado?: boolean
    professorId?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CodigoProfessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | CodigoProfessor$professorArgs<ExtArgs>
  }
  export type CodigoProfessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professor?: boolean | CodigoProfessor$professorArgs<ExtArgs>
  }

  export type $CodigoProfessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CodigoProfessor"
    objects: {
      professor: Prisma.$UsuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codigo: string
      usado: boolean
      professorId: number | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["codigoProfessor"]>
    composites: {}
  }

  type CodigoProfessorGetPayload<S extends boolean | null | undefined | CodigoProfessorDefaultArgs> = $Result.GetResult<Prisma.$CodigoProfessorPayload, S>

  type CodigoProfessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CodigoProfessorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CodigoProfessorCountAggregateInputType | true
    }

  export interface CodigoProfessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CodigoProfessor'], meta: { name: 'CodigoProfessor' } }
    /**
     * Find zero or one CodigoProfessor that matches the filter.
     * @param {CodigoProfessorFindUniqueArgs} args - Arguments to find a CodigoProfessor
     * @example
     * // Get one CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodigoProfessorFindUniqueArgs>(args: SelectSubset<T, CodigoProfessorFindUniqueArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CodigoProfessor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CodigoProfessorFindUniqueOrThrowArgs} args - Arguments to find a CodigoProfessor
     * @example
     * // Get one CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodigoProfessorFindUniqueOrThrowArgs>(args: SelectSubset<T, CodigoProfessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CodigoProfessor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorFindFirstArgs} args - Arguments to find a CodigoProfessor
     * @example
     * // Get one CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodigoProfessorFindFirstArgs>(args?: SelectSubset<T, CodigoProfessorFindFirstArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CodigoProfessor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorFindFirstOrThrowArgs} args - Arguments to find a CodigoProfessor
     * @example
     * // Get one CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodigoProfessorFindFirstOrThrowArgs>(args?: SelectSubset<T, CodigoProfessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CodigoProfessors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CodigoProfessors
     * const codigoProfessors = await prisma.codigoProfessor.findMany()
     * 
     * // Get first 10 CodigoProfessors
     * const codigoProfessors = await prisma.codigoProfessor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codigoProfessorWithIdOnly = await prisma.codigoProfessor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodigoProfessorFindManyArgs>(args?: SelectSubset<T, CodigoProfessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CodigoProfessor.
     * @param {CodigoProfessorCreateArgs} args - Arguments to create a CodigoProfessor.
     * @example
     * // Create one CodigoProfessor
     * const CodigoProfessor = await prisma.codigoProfessor.create({
     *   data: {
     *     // ... data to create a CodigoProfessor
     *   }
     * })
     * 
     */
    create<T extends CodigoProfessorCreateArgs>(args: SelectSubset<T, CodigoProfessorCreateArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CodigoProfessors.
     * @param {CodigoProfessorCreateManyArgs} args - Arguments to create many CodigoProfessors.
     * @example
     * // Create many CodigoProfessors
     * const codigoProfessor = await prisma.codigoProfessor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodigoProfessorCreateManyArgs>(args?: SelectSubset<T, CodigoProfessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CodigoProfessors and returns the data saved in the database.
     * @param {CodigoProfessorCreateManyAndReturnArgs} args - Arguments to create many CodigoProfessors.
     * @example
     * // Create many CodigoProfessors
     * const codigoProfessor = await prisma.codigoProfessor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CodigoProfessors and only return the `id`
     * const codigoProfessorWithIdOnly = await prisma.codigoProfessor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodigoProfessorCreateManyAndReturnArgs>(args?: SelectSubset<T, CodigoProfessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CodigoProfessor.
     * @param {CodigoProfessorDeleteArgs} args - Arguments to delete one CodigoProfessor.
     * @example
     * // Delete one CodigoProfessor
     * const CodigoProfessor = await prisma.codigoProfessor.delete({
     *   where: {
     *     // ... filter to delete one CodigoProfessor
     *   }
     * })
     * 
     */
    delete<T extends CodigoProfessorDeleteArgs>(args: SelectSubset<T, CodigoProfessorDeleteArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CodigoProfessor.
     * @param {CodigoProfessorUpdateArgs} args - Arguments to update one CodigoProfessor.
     * @example
     * // Update one CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodigoProfessorUpdateArgs>(args: SelectSubset<T, CodigoProfessorUpdateArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CodigoProfessors.
     * @param {CodigoProfessorDeleteManyArgs} args - Arguments to filter CodigoProfessors to delete.
     * @example
     * // Delete a few CodigoProfessors
     * const { count } = await prisma.codigoProfessor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodigoProfessorDeleteManyArgs>(args?: SelectSubset<T, CodigoProfessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodigoProfessors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CodigoProfessors
     * const codigoProfessor = await prisma.codigoProfessor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodigoProfessorUpdateManyArgs>(args: SelectSubset<T, CodigoProfessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CodigoProfessor.
     * @param {CodigoProfessorUpsertArgs} args - Arguments to update or create a CodigoProfessor.
     * @example
     * // Update or create a CodigoProfessor
     * const codigoProfessor = await prisma.codigoProfessor.upsert({
     *   create: {
     *     // ... data to create a CodigoProfessor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CodigoProfessor we want to update
     *   }
     * })
     */
    upsert<T extends CodigoProfessorUpsertArgs>(args: SelectSubset<T, CodigoProfessorUpsertArgs<ExtArgs>>): Prisma__CodigoProfessorClient<$Result.GetResult<Prisma.$CodigoProfessorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CodigoProfessors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorCountArgs} args - Arguments to filter CodigoProfessors to count.
     * @example
     * // Count the number of CodigoProfessors
     * const count = await prisma.codigoProfessor.count({
     *   where: {
     *     // ... the filter for the CodigoProfessors we want to count
     *   }
     * })
    **/
    count<T extends CodigoProfessorCountArgs>(
      args?: Subset<T, CodigoProfessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodigoProfessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CodigoProfessor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodigoProfessorAggregateArgs>(args: Subset<T, CodigoProfessorAggregateArgs>): Prisma.PrismaPromise<GetCodigoProfessorAggregateType<T>>

    /**
     * Group by CodigoProfessor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodigoProfessorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodigoProfessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodigoProfessorGroupByArgs['orderBy'] }
        : { orderBy?: CodigoProfessorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodigoProfessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodigoProfessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CodigoProfessor model
   */
  readonly fields: CodigoProfessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CodigoProfessor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodigoProfessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professor<T extends CodigoProfessor$professorArgs<ExtArgs> = {}>(args?: Subset<T, CodigoProfessor$professorArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CodigoProfessor model
   */ 
  interface CodigoProfessorFieldRefs {
    readonly id: FieldRef<"CodigoProfessor", 'Int'>
    readonly codigo: FieldRef<"CodigoProfessor", 'String'>
    readonly usado: FieldRef<"CodigoProfessor", 'Boolean'>
    readonly professorId: FieldRef<"CodigoProfessor", 'Int'>
    readonly criadoEm: FieldRef<"CodigoProfessor", 'DateTime'>
    readonly atualizadoEm: FieldRef<"CodigoProfessor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CodigoProfessor findUnique
   */
  export type CodigoProfessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter, which CodigoProfessor to fetch.
     */
    where: CodigoProfessorWhereUniqueInput
  }

  /**
   * CodigoProfessor findUniqueOrThrow
   */
  export type CodigoProfessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter, which CodigoProfessor to fetch.
     */
    where: CodigoProfessorWhereUniqueInput
  }

  /**
   * CodigoProfessor findFirst
   */
  export type CodigoProfessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter, which CodigoProfessor to fetch.
     */
    where?: CodigoProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodigoProfessors to fetch.
     */
    orderBy?: CodigoProfessorOrderByWithRelationInput | CodigoProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodigoProfessors.
     */
    cursor?: CodigoProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodigoProfessors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodigoProfessors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodigoProfessors.
     */
    distinct?: CodigoProfessorScalarFieldEnum | CodigoProfessorScalarFieldEnum[]
  }

  /**
   * CodigoProfessor findFirstOrThrow
   */
  export type CodigoProfessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter, which CodigoProfessor to fetch.
     */
    where?: CodigoProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodigoProfessors to fetch.
     */
    orderBy?: CodigoProfessorOrderByWithRelationInput | CodigoProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodigoProfessors.
     */
    cursor?: CodigoProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodigoProfessors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodigoProfessors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodigoProfessors.
     */
    distinct?: CodigoProfessorScalarFieldEnum | CodigoProfessorScalarFieldEnum[]
  }

  /**
   * CodigoProfessor findMany
   */
  export type CodigoProfessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter, which CodigoProfessors to fetch.
     */
    where?: CodigoProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodigoProfessors to fetch.
     */
    orderBy?: CodigoProfessorOrderByWithRelationInput | CodigoProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CodigoProfessors.
     */
    cursor?: CodigoProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodigoProfessors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodigoProfessors.
     */
    skip?: number
    distinct?: CodigoProfessorScalarFieldEnum | CodigoProfessorScalarFieldEnum[]
  }

  /**
   * CodigoProfessor create
   */
  export type CodigoProfessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * The data needed to create a CodigoProfessor.
     */
    data: XOR<CodigoProfessorCreateInput, CodigoProfessorUncheckedCreateInput>
  }

  /**
   * CodigoProfessor createMany
   */
  export type CodigoProfessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CodigoProfessors.
     */
    data: CodigoProfessorCreateManyInput | CodigoProfessorCreateManyInput[]
  }

  /**
   * CodigoProfessor createManyAndReturn
   */
  export type CodigoProfessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CodigoProfessors.
     */
    data: CodigoProfessorCreateManyInput | CodigoProfessorCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodigoProfessor update
   */
  export type CodigoProfessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * The data needed to update a CodigoProfessor.
     */
    data: XOR<CodigoProfessorUpdateInput, CodigoProfessorUncheckedUpdateInput>
    /**
     * Choose, which CodigoProfessor to update.
     */
    where: CodigoProfessorWhereUniqueInput
  }

  /**
   * CodigoProfessor updateMany
   */
  export type CodigoProfessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CodigoProfessors.
     */
    data: XOR<CodigoProfessorUpdateManyMutationInput, CodigoProfessorUncheckedUpdateManyInput>
    /**
     * Filter which CodigoProfessors to update
     */
    where?: CodigoProfessorWhereInput
  }

  /**
   * CodigoProfessor upsert
   */
  export type CodigoProfessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * The filter to search for the CodigoProfessor to update in case it exists.
     */
    where: CodigoProfessorWhereUniqueInput
    /**
     * In case the CodigoProfessor found by the `where` argument doesn't exist, create a new CodigoProfessor with this data.
     */
    create: XOR<CodigoProfessorCreateInput, CodigoProfessorUncheckedCreateInput>
    /**
     * In case the CodigoProfessor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodigoProfessorUpdateInput, CodigoProfessorUncheckedUpdateInput>
  }

  /**
   * CodigoProfessor delete
   */
  export type CodigoProfessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
    /**
     * Filter which CodigoProfessor to delete.
     */
    where: CodigoProfessorWhereUniqueInput
  }

  /**
   * CodigoProfessor deleteMany
   */
  export type CodigoProfessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodigoProfessors to delete
     */
    where?: CodigoProfessorWhereInput
  }

  /**
   * CodigoProfessor.professor
   */
  export type CodigoProfessor$professorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * CodigoProfessor without action
   */
  export type CodigoProfessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodigoProfessor
     */
    select?: CodigoProfessorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodigoProfessorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    telefone: 'telefone',
    perfil: 'perfil',
    imagem: 'imagem',
    relacaoEducando: 'relacaoEducando',
    codigoVerificacao: 'codigoVerificacao',
    ultimoLogin: 'ultimoLogin',
    ativo: 'ativo',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const AlunoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    matricula: 'matricula',
    telefone: 'telefone',
    email: 'email',
    imagem: 'imagem',
    classe: 'classe',
    dataNascimento: 'dataNascimento',
    endereco: 'endereco',
    turmaId: 'turmaId',
    encarregadoId: 'encarregadoId',
    cursoId: 'cursoId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type AlunoScalarFieldEnum = (typeof AlunoScalarFieldEnum)[keyof typeof AlunoScalarFieldEnum]


  export const TurmaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    ano: 'ano',
    semestre: 'semestre',
    capacidade: 'capacidade',
    turno: 'turno',
    professorId: 'professorId',
    cursoId: 'cursoId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type TurmaScalarFieldEnum = (typeof TurmaScalarFieldEnum)[keyof typeof TurmaScalarFieldEnum]


  export const CursoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao',
    cargaHoraria: 'cargaHoraria',
    duracaoMeses: 'duracaoMeses',
    nivel: 'nivel',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CursoScalarFieldEnum = (typeof CursoScalarFieldEnum)[keyof typeof CursoScalarFieldEnum]


  export const DisciplinaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    codigo: 'codigo',
    descricao: 'descricao',
    cargaHoraria: 'cargaHoraria',
    semestre: 'semestre',
    cursoId: 'cursoId',
    professorId: 'professorId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type DisciplinaScalarFieldEnum = (typeof DisciplinaScalarFieldEnum)[keyof typeof DisciplinaScalarFieldEnum]


  export const NotaScalarFieldEnum: {
    id: 'id',
    valor: 'valor',
    tipo: 'tipo',
    alunoId: 'alunoId',
    disciplinaId: 'disciplinaId',
    semestre: 'semestre',
    observacao: 'observacao',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type NotaScalarFieldEnum = (typeof NotaScalarFieldEnum)[keyof typeof NotaScalarFieldEnum]


  export const MensagemScalarFieldEnum: {
    id: 'id',
    conteudo: 'conteudo',
    remetenteId: 'remetenteId',
    destinatarioId: 'destinatarioId',
    lida: 'lida',
    lidaEm: 'lidaEm',
    editadoEm: 'editadoEm',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm',
    deletadoParaRemetente: 'deletadoParaRemetente',
    deletadoParaDestinatario: 'deletadoParaDestinatario',
    arquivoUrl: 'arquivoUrl',
    arquivoNome: 'arquivoNome',
    arquivoTipo: 'arquivoTipo',
    arquivoTamanho: 'arquivoTamanho'
  };

  export type MensagemScalarFieldEnum = (typeof MensagemScalarFieldEnum)[keyof typeof MensagemScalarFieldEnum]


  export const AvisoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    conteudo: 'conteudo',
    imagem: 'imagem',
    categoria: 'categoria',
    autorId: 'autorId',
    autorNome: 'autorNome',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type AvisoScalarFieldEnum = (typeof AvisoScalarFieldEnum)[keyof typeof AvisoScalarFieldEnum]


  export const EventoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descricao: 'descricao',
    imagem: 'imagem',
    dataEvento: 'dataEvento',
    dataFim: 'dataFim',
    local: 'local',
    organizador: 'organizador',
    maxParticipantes: 'maxParticipantes',
    categoria: 'categoria',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type EventoScalarFieldEnum = (typeof EventoScalarFieldEnum)[keyof typeof EventoScalarFieldEnum]


  export const ReuniaoScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    descricao: 'descricao',
    local: 'local',
    linkMeeting: 'linkMeeting',
    dataHora: 'dataHora',
    criadoPorId: 'criadoPorId',
    status: 'status',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type ReuniaoScalarFieldEnum = (typeof ReuniaoScalarFieldEnum)[keyof typeof ReuniaoScalarFieldEnum]


  export const ReuniaoParticipanteScalarFieldEnum: {
    id: 'id',
    reuniaoId: 'reuniaoId',
    usuarioId: 'usuarioId',
    status: 'status',
    confirmadoEm: 'confirmadoEm',
    criadoEm: 'criadoEm'
  };

  export type ReuniaoParticipanteScalarFieldEnum = (typeof ReuniaoParticipanteScalarFieldEnum)[keyof typeof ReuniaoParticipanteScalarFieldEnum]


  export const RelatorioScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    conteudo: 'conteudo',
    tipo: 'tipo',
    autorId: 'autorId',
    dataReferencia: 'dataReferencia',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type RelatorioScalarFieldEnum = (typeof RelatorioScalarFieldEnum)[keyof typeof RelatorioScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    assunto: 'assunto',
    mensagem: 'mensagem',
    avaliacao: 'avaliacao',
    categoria: 'categoria',
    status: 'status',
    resposta: 'resposta',
    respondidoEm: 'respondidoEm',
    usuarioId: 'usuarioId',
    criadoEm: 'criadoEm'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const CodigoProfessorScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    usado: 'usado',
    professorId: 'professorId',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CodigoProfessorScalarFieldEnum = (typeof CodigoProfessorScalarFieldEnum)[keyof typeof CodigoProfessorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    telefone?: StringFilter<"Usuario"> | string
    perfil?: StringFilter<"Usuario"> | string
    imagem?: StringNullableFilter<"Usuario"> | string | null
    relacaoEducando?: StringNullableFilter<"Usuario"> | string | null
    codigoVerificacao?: StringNullableFilter<"Usuario"> | string | null
    ultimoLogin?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    alunos?: AlunoListRelationFilter
    turmas?: TurmaListRelationFilter
    disciplinas?: DisciplinaListRelationFilter
    cursos?: CursoListRelationFilter
    mensagensEnviadas?: MensagemListRelationFilter
    mensagensRecebidas?: MensagemListRelationFilter
    reunioes?: ReuniaoParticipanteListRelationFilter
    reunioesAgendadas?: ReuniaoListRelationFilter
    codigoProfessor?: XOR<CodigoProfessorNullableRelationFilter, CodigoProfessorWhereInput> | null
    feedbacks?: FeedbackListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    perfil?: SortOrder
    imagem?: SortOrderInput | SortOrder
    relacaoEducando?: SortOrderInput | SortOrder
    codigoVerificacao?: SortOrderInput | SortOrder
    ultimoLogin?: SortOrderInput | SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    alunos?: AlunoOrderByRelationAggregateInput
    turmas?: TurmaOrderByRelationAggregateInput
    disciplinas?: DisciplinaOrderByRelationAggregateInput
    cursos?: CursoOrderByRelationAggregateInput
    mensagensEnviadas?: MensagemOrderByRelationAggregateInput
    mensagensRecebidas?: MensagemOrderByRelationAggregateInput
    reunioes?: ReuniaoParticipanteOrderByRelationAggregateInput
    reunioesAgendadas?: ReuniaoOrderByRelationAggregateInput
    codigoProfessor?: CodigoProfessorOrderByWithRelationInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    telefone?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    perfil?: StringFilter<"Usuario"> | string
    imagem?: StringNullableFilter<"Usuario"> | string | null
    relacaoEducando?: StringNullableFilter<"Usuario"> | string | null
    codigoVerificacao?: StringNullableFilter<"Usuario"> | string | null
    ultimoLogin?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    alunos?: AlunoListRelationFilter
    turmas?: TurmaListRelationFilter
    disciplinas?: DisciplinaListRelationFilter
    cursos?: CursoListRelationFilter
    mensagensEnviadas?: MensagemListRelationFilter
    mensagensRecebidas?: MensagemListRelationFilter
    reunioes?: ReuniaoParticipanteListRelationFilter
    reunioesAgendadas?: ReuniaoListRelationFilter
    codigoProfessor?: XOR<CodigoProfessorNullableRelationFilter, CodigoProfessorWhereInput> | null
    feedbacks?: FeedbackListRelationFilter
  }, "id" | "email" | "telefone">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    perfil?: SortOrder
    imagem?: SortOrderInput | SortOrder
    relacaoEducando?: SortOrderInput | SortOrder
    codigoVerificacao?: SortOrderInput | SortOrder
    ultimoLogin?: SortOrderInput | SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senha?: StringWithAggregatesFilter<"Usuario"> | string
    telefone?: StringWithAggregatesFilter<"Usuario"> | string
    perfil?: StringWithAggregatesFilter<"Usuario"> | string
    imagem?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    relacaoEducando?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    codigoVerificacao?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    ultimoLogin?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    ativo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type AlunoWhereInput = {
    AND?: AlunoWhereInput | AlunoWhereInput[]
    OR?: AlunoWhereInput[]
    NOT?: AlunoWhereInput | AlunoWhereInput[]
    id?: IntFilter<"Aluno"> | number
    nome?: StringFilter<"Aluno"> | string
    matricula?: StringFilter<"Aluno"> | string
    telefone?: StringFilter<"Aluno"> | string
    email?: StringNullableFilter<"Aluno"> | string | null
    imagem?: StringNullableFilter<"Aluno"> | string | null
    classe?: StringFilter<"Aluno"> | string
    dataNascimento?: DateTimeNullableFilter<"Aluno"> | Date | string | null
    endereco?: StringNullableFilter<"Aluno"> | string | null
    turmaId?: IntFilter<"Aluno"> | number
    encarregadoId?: IntNullableFilter<"Aluno"> | number | null
    cursoId?: IntFilter<"Aluno"> | number
    criadoEm?: DateTimeFilter<"Aluno"> | Date | string
    atualizadoEm?: DateTimeFilter<"Aluno"> | Date | string
    turma?: XOR<TurmaRelationFilter, TurmaWhereInput>
    encarregado?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    curso?: XOR<CursoRelationFilter, CursoWhereInput>
    notas?: NotaListRelationFilter
  }

  export type AlunoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    matricula?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    imagem?: SortOrderInput | SortOrder
    classe?: SortOrder
    dataNascimento?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrderInput | SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    turma?: TurmaOrderByWithRelationInput
    encarregado?: UsuarioOrderByWithRelationInput
    curso?: CursoOrderByWithRelationInput
    notas?: NotaOrderByRelationAggregateInput
  }

  export type AlunoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    matricula?: string
    telefone?: string
    email?: string
    AND?: AlunoWhereInput | AlunoWhereInput[]
    OR?: AlunoWhereInput[]
    NOT?: AlunoWhereInput | AlunoWhereInput[]
    nome?: StringFilter<"Aluno"> | string
    imagem?: StringNullableFilter<"Aluno"> | string | null
    classe?: StringFilter<"Aluno"> | string
    dataNascimento?: DateTimeNullableFilter<"Aluno"> | Date | string | null
    endereco?: StringNullableFilter<"Aluno"> | string | null
    turmaId?: IntFilter<"Aluno"> | number
    encarregadoId?: IntNullableFilter<"Aluno"> | number | null
    cursoId?: IntFilter<"Aluno"> | number
    criadoEm?: DateTimeFilter<"Aluno"> | Date | string
    atualizadoEm?: DateTimeFilter<"Aluno"> | Date | string
    turma?: XOR<TurmaRelationFilter, TurmaWhereInput>
    encarregado?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    curso?: XOR<CursoRelationFilter, CursoWhereInput>
    notas?: NotaListRelationFilter
  }, "id" | "matricula" | "telefone" | "email">

  export type AlunoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    matricula?: SortOrder
    telefone?: SortOrder
    email?: SortOrderInput | SortOrder
    imagem?: SortOrderInput | SortOrder
    classe?: SortOrder
    dataNascimento?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrderInput | SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: AlunoCountOrderByAggregateInput
    _avg?: AlunoAvgOrderByAggregateInput
    _max?: AlunoMaxOrderByAggregateInput
    _min?: AlunoMinOrderByAggregateInput
    _sum?: AlunoSumOrderByAggregateInput
  }

  export type AlunoScalarWhereWithAggregatesInput = {
    AND?: AlunoScalarWhereWithAggregatesInput | AlunoScalarWhereWithAggregatesInput[]
    OR?: AlunoScalarWhereWithAggregatesInput[]
    NOT?: AlunoScalarWhereWithAggregatesInput | AlunoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Aluno"> | number
    nome?: StringWithAggregatesFilter<"Aluno"> | string
    matricula?: StringWithAggregatesFilter<"Aluno"> | string
    telefone?: StringWithAggregatesFilter<"Aluno"> | string
    email?: StringNullableWithAggregatesFilter<"Aluno"> | string | null
    imagem?: StringNullableWithAggregatesFilter<"Aluno"> | string | null
    classe?: StringWithAggregatesFilter<"Aluno"> | string
    dataNascimento?: DateTimeNullableWithAggregatesFilter<"Aluno"> | Date | string | null
    endereco?: StringNullableWithAggregatesFilter<"Aluno"> | string | null
    turmaId?: IntWithAggregatesFilter<"Aluno"> | number
    encarregadoId?: IntNullableWithAggregatesFilter<"Aluno"> | number | null
    cursoId?: IntWithAggregatesFilter<"Aluno"> | number
    criadoEm?: DateTimeWithAggregatesFilter<"Aluno"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Aluno"> | Date | string
  }

  export type TurmaWhereInput = {
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    id?: IntFilter<"Turma"> | number
    nome?: StringFilter<"Turma"> | string
    ano?: IntFilter<"Turma"> | number
    semestre?: IntNullableFilter<"Turma"> | number | null
    capacidade?: IntNullableFilter<"Turma"> | number | null
    turno?: StringNullableFilter<"Turma"> | string | null
    professorId?: IntNullableFilter<"Turma"> | number | null
    cursoId?: IntNullableFilter<"Turma"> | number | null
    criadoEm?: DateTimeFilter<"Turma"> | Date | string
    atualizadoEm?: DateTimeFilter<"Turma"> | Date | string
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    curso?: XOR<CursoNullableRelationFilter, CursoWhereInput> | null
    alunos?: AlunoListRelationFilter
    disciplinas?: DisciplinaListRelationFilter
  }

  export type TurmaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    ano?: SortOrder
    semestre?: SortOrderInput | SortOrder
    capacidade?: SortOrderInput | SortOrder
    turno?: SortOrderInput | SortOrder
    professorId?: SortOrderInput | SortOrder
    cursoId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    professor?: UsuarioOrderByWithRelationInput
    curso?: CursoOrderByWithRelationInput
    alunos?: AlunoOrderByRelationAggregateInput
    disciplinas?: DisciplinaOrderByRelationAggregateInput
  }

  export type TurmaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nome_ano?: TurmaNomeAnoCompoundUniqueInput
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    nome?: StringFilter<"Turma"> | string
    ano?: IntFilter<"Turma"> | number
    semestre?: IntNullableFilter<"Turma"> | number | null
    capacidade?: IntNullableFilter<"Turma"> | number | null
    turno?: StringNullableFilter<"Turma"> | string | null
    professorId?: IntNullableFilter<"Turma"> | number | null
    cursoId?: IntNullableFilter<"Turma"> | number | null
    criadoEm?: DateTimeFilter<"Turma"> | Date | string
    atualizadoEm?: DateTimeFilter<"Turma"> | Date | string
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    curso?: XOR<CursoNullableRelationFilter, CursoWhereInput> | null
    alunos?: AlunoListRelationFilter
    disciplinas?: DisciplinaListRelationFilter
  }, "id" | "nome_ano">

  export type TurmaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    ano?: SortOrder
    semestre?: SortOrderInput | SortOrder
    capacidade?: SortOrderInput | SortOrder
    turno?: SortOrderInput | SortOrder
    professorId?: SortOrderInput | SortOrder
    cursoId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: TurmaCountOrderByAggregateInput
    _avg?: TurmaAvgOrderByAggregateInput
    _max?: TurmaMaxOrderByAggregateInput
    _min?: TurmaMinOrderByAggregateInput
    _sum?: TurmaSumOrderByAggregateInput
  }

  export type TurmaScalarWhereWithAggregatesInput = {
    AND?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    OR?: TurmaScalarWhereWithAggregatesInput[]
    NOT?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Turma"> | number
    nome?: StringWithAggregatesFilter<"Turma"> | string
    ano?: IntWithAggregatesFilter<"Turma"> | number
    semestre?: IntNullableWithAggregatesFilter<"Turma"> | number | null
    capacidade?: IntNullableWithAggregatesFilter<"Turma"> | number | null
    turno?: StringNullableWithAggregatesFilter<"Turma"> | string | null
    professorId?: IntNullableWithAggregatesFilter<"Turma"> | number | null
    cursoId?: IntNullableWithAggregatesFilter<"Turma"> | number | null
    criadoEm?: DateTimeWithAggregatesFilter<"Turma"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Turma"> | Date | string
  }

  export type CursoWhereInput = {
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    id?: IntFilter<"Curso"> | number
    nome?: StringFilter<"Curso"> | string
    descricao?: StringFilter<"Curso"> | string
    cargaHoraria?: IntNullableFilter<"Curso"> | number | null
    duracaoMeses?: IntNullableFilter<"Curso"> | number | null
    nivel?: StringNullableFilter<"Curso"> | string | null
    criadoEm?: DateTimeFilter<"Curso"> | Date | string
    atualizadoEm?: DateTimeFilter<"Curso"> | Date | string
    disciplinas?: DisciplinaListRelationFilter
    alunos?: AlunoListRelationFilter
    turmas?: TurmaListRelationFilter
    professores?: UsuarioListRelationFilter
  }

  export type CursoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrderInput | SortOrder
    duracaoMeses?: SortOrderInput | SortOrder
    nivel?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    disciplinas?: DisciplinaOrderByRelationAggregateInput
    alunos?: AlunoOrderByRelationAggregateInput
    turmas?: TurmaOrderByRelationAggregateInput
    professores?: UsuarioOrderByRelationAggregateInput
  }

  export type CursoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nome?: string
    AND?: CursoWhereInput | CursoWhereInput[]
    OR?: CursoWhereInput[]
    NOT?: CursoWhereInput | CursoWhereInput[]
    descricao?: StringFilter<"Curso"> | string
    cargaHoraria?: IntNullableFilter<"Curso"> | number | null
    duracaoMeses?: IntNullableFilter<"Curso"> | number | null
    nivel?: StringNullableFilter<"Curso"> | string | null
    criadoEm?: DateTimeFilter<"Curso"> | Date | string
    atualizadoEm?: DateTimeFilter<"Curso"> | Date | string
    disciplinas?: DisciplinaListRelationFilter
    alunos?: AlunoListRelationFilter
    turmas?: TurmaListRelationFilter
    professores?: UsuarioListRelationFilter
  }, "id" | "nome">

  export type CursoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrderInput | SortOrder
    duracaoMeses?: SortOrderInput | SortOrder
    nivel?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CursoCountOrderByAggregateInput
    _avg?: CursoAvgOrderByAggregateInput
    _max?: CursoMaxOrderByAggregateInput
    _min?: CursoMinOrderByAggregateInput
    _sum?: CursoSumOrderByAggregateInput
  }

  export type CursoScalarWhereWithAggregatesInput = {
    AND?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    OR?: CursoScalarWhereWithAggregatesInput[]
    NOT?: CursoScalarWhereWithAggregatesInput | CursoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Curso"> | number
    nome?: StringWithAggregatesFilter<"Curso"> | string
    descricao?: StringWithAggregatesFilter<"Curso"> | string
    cargaHoraria?: IntNullableWithAggregatesFilter<"Curso"> | number | null
    duracaoMeses?: IntNullableWithAggregatesFilter<"Curso"> | number | null
    nivel?: StringNullableWithAggregatesFilter<"Curso"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Curso"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Curso"> | Date | string
  }

  export type DisciplinaWhereInput = {
    AND?: DisciplinaWhereInput | DisciplinaWhereInput[]
    OR?: DisciplinaWhereInput[]
    NOT?: DisciplinaWhereInput | DisciplinaWhereInput[]
    id?: IntFilter<"Disciplina"> | number
    nome?: StringFilter<"Disciplina"> | string
    codigo?: StringNullableFilter<"Disciplina"> | string | null
    descricao?: StringFilter<"Disciplina"> | string
    cargaHoraria?: IntNullableFilter<"Disciplina"> | number | null
    semestre?: IntNullableFilter<"Disciplina"> | number | null
    cursoId?: IntFilter<"Disciplina"> | number
    professorId?: IntNullableFilter<"Disciplina"> | number | null
    criadoEm?: DateTimeFilter<"Disciplina"> | Date | string
    atualizadoEm?: DateTimeFilter<"Disciplina"> | Date | string
    curso?: XOR<CursoRelationFilter, CursoWhereInput>
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    notas?: NotaListRelationFilter
    turmas?: TurmaListRelationFilter
  }

  export type DisciplinaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    codigo?: SortOrderInput | SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrderInput | SortOrder
    semestre?: SortOrderInput | SortOrder
    cursoId?: SortOrder
    professorId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    curso?: CursoOrderByWithRelationInput
    professor?: UsuarioOrderByWithRelationInput
    notas?: NotaOrderByRelationAggregateInput
    turmas?: TurmaOrderByRelationAggregateInput
  }

  export type DisciplinaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigo?: string
    nome_cursoId?: DisciplinaNomeCursoIdCompoundUniqueInput
    AND?: DisciplinaWhereInput | DisciplinaWhereInput[]
    OR?: DisciplinaWhereInput[]
    NOT?: DisciplinaWhereInput | DisciplinaWhereInput[]
    nome?: StringFilter<"Disciplina"> | string
    descricao?: StringFilter<"Disciplina"> | string
    cargaHoraria?: IntNullableFilter<"Disciplina"> | number | null
    semestre?: IntNullableFilter<"Disciplina"> | number | null
    cursoId?: IntFilter<"Disciplina"> | number
    professorId?: IntNullableFilter<"Disciplina"> | number | null
    criadoEm?: DateTimeFilter<"Disciplina"> | Date | string
    atualizadoEm?: DateTimeFilter<"Disciplina"> | Date | string
    curso?: XOR<CursoRelationFilter, CursoWhereInput>
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    notas?: NotaListRelationFilter
    turmas?: TurmaListRelationFilter
  }, "id" | "codigo" | "nome_cursoId">

  export type DisciplinaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    codigo?: SortOrderInput | SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrderInput | SortOrder
    semestre?: SortOrderInput | SortOrder
    cursoId?: SortOrder
    professorId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: DisciplinaCountOrderByAggregateInput
    _avg?: DisciplinaAvgOrderByAggregateInput
    _max?: DisciplinaMaxOrderByAggregateInput
    _min?: DisciplinaMinOrderByAggregateInput
    _sum?: DisciplinaSumOrderByAggregateInput
  }

  export type DisciplinaScalarWhereWithAggregatesInput = {
    AND?: DisciplinaScalarWhereWithAggregatesInput | DisciplinaScalarWhereWithAggregatesInput[]
    OR?: DisciplinaScalarWhereWithAggregatesInput[]
    NOT?: DisciplinaScalarWhereWithAggregatesInput | DisciplinaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Disciplina"> | number
    nome?: StringWithAggregatesFilter<"Disciplina"> | string
    codigo?: StringNullableWithAggregatesFilter<"Disciplina"> | string | null
    descricao?: StringWithAggregatesFilter<"Disciplina"> | string
    cargaHoraria?: IntNullableWithAggregatesFilter<"Disciplina"> | number | null
    semestre?: IntNullableWithAggregatesFilter<"Disciplina"> | number | null
    cursoId?: IntWithAggregatesFilter<"Disciplina"> | number
    professorId?: IntNullableWithAggregatesFilter<"Disciplina"> | number | null
    criadoEm?: DateTimeWithAggregatesFilter<"Disciplina"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Disciplina"> | Date | string
  }

  export type NotaWhereInput = {
    AND?: NotaWhereInput | NotaWhereInput[]
    OR?: NotaWhereInput[]
    NOT?: NotaWhereInput | NotaWhereInput[]
    id?: IntFilter<"Nota"> | number
    valor?: FloatFilter<"Nota"> | number
    tipo?: StringFilter<"Nota"> | string
    alunoId?: IntFilter<"Nota"> | number
    disciplinaId?: IntFilter<"Nota"> | number
    semestre?: IntFilter<"Nota"> | number
    observacao?: StringNullableFilter<"Nota"> | string | null
    criadoEm?: DateTimeFilter<"Nota"> | Date | string
    atualizadoEm?: DateTimeFilter<"Nota"> | Date | string
    aluno?: XOR<AlunoRelationFilter, AlunoWhereInput>
    disciplina?: XOR<DisciplinaRelationFilter, DisciplinaWhereInput>
  }

  export type NotaOrderByWithRelationInput = {
    id?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
    observacao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    aluno?: AlunoOrderByWithRelationInput
    disciplina?: DisciplinaOrderByWithRelationInput
  }

  export type NotaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    alunoId_disciplinaId_tipo_semestre?: NotaAlunoIdDisciplinaIdTipoSemestreCompoundUniqueInput
    AND?: NotaWhereInput | NotaWhereInput[]
    OR?: NotaWhereInput[]
    NOT?: NotaWhereInput | NotaWhereInput[]
    valor?: FloatFilter<"Nota"> | number
    tipo?: StringFilter<"Nota"> | string
    alunoId?: IntFilter<"Nota"> | number
    disciplinaId?: IntFilter<"Nota"> | number
    semestre?: IntFilter<"Nota"> | number
    observacao?: StringNullableFilter<"Nota"> | string | null
    criadoEm?: DateTimeFilter<"Nota"> | Date | string
    atualizadoEm?: DateTimeFilter<"Nota"> | Date | string
    aluno?: XOR<AlunoRelationFilter, AlunoWhereInput>
    disciplina?: XOR<DisciplinaRelationFilter, DisciplinaWhereInput>
  }, "id" | "alunoId_disciplinaId_tipo_semestre">

  export type NotaOrderByWithAggregationInput = {
    id?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
    observacao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: NotaCountOrderByAggregateInput
    _avg?: NotaAvgOrderByAggregateInput
    _max?: NotaMaxOrderByAggregateInput
    _min?: NotaMinOrderByAggregateInput
    _sum?: NotaSumOrderByAggregateInput
  }

  export type NotaScalarWhereWithAggregatesInput = {
    AND?: NotaScalarWhereWithAggregatesInput | NotaScalarWhereWithAggregatesInput[]
    OR?: NotaScalarWhereWithAggregatesInput[]
    NOT?: NotaScalarWhereWithAggregatesInput | NotaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Nota"> | number
    valor?: FloatWithAggregatesFilter<"Nota"> | number
    tipo?: StringWithAggregatesFilter<"Nota"> | string
    alunoId?: IntWithAggregatesFilter<"Nota"> | number
    disciplinaId?: IntWithAggregatesFilter<"Nota"> | number
    semestre?: IntWithAggregatesFilter<"Nota"> | number
    observacao?: StringNullableWithAggregatesFilter<"Nota"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Nota"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Nota"> | Date | string
  }

  export type MensagemWhereInput = {
    AND?: MensagemWhereInput | MensagemWhereInput[]
    OR?: MensagemWhereInput[]
    NOT?: MensagemWhereInput | MensagemWhereInput[]
    id?: IntFilter<"Mensagem"> | number
    conteudo?: StringFilter<"Mensagem"> | string
    remetenteId?: IntFilter<"Mensagem"> | number
    destinatarioId?: IntFilter<"Mensagem"> | number
    lida?: BoolFilter<"Mensagem"> | boolean
    lidaEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    editadoEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    criadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    atualizadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    deletadoParaRemetente?: BoolFilter<"Mensagem"> | boolean
    deletadoParaDestinatario?: BoolFilter<"Mensagem"> | boolean
    arquivoUrl?: StringNullableFilter<"Mensagem"> | string | null
    arquivoNome?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTipo?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTamanho?: IntNullableFilter<"Mensagem"> | number | null
    remetente?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    destinatario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
  }

  export type MensagemOrderByWithRelationInput = {
    id?: SortOrder
    conteudo?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    lida?: SortOrder
    lidaEm?: SortOrderInput | SortOrder
    editadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    deletadoParaRemetente?: SortOrder
    deletadoParaDestinatario?: SortOrder
    arquivoUrl?: SortOrderInput | SortOrder
    arquivoNome?: SortOrderInput | SortOrder
    arquivoTipo?: SortOrderInput | SortOrder
    arquivoTamanho?: SortOrderInput | SortOrder
    remetente?: UsuarioOrderByWithRelationInput
    destinatario?: UsuarioOrderByWithRelationInput
  }

  export type MensagemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MensagemWhereInput | MensagemWhereInput[]
    OR?: MensagemWhereInput[]
    NOT?: MensagemWhereInput | MensagemWhereInput[]
    conteudo?: StringFilter<"Mensagem"> | string
    remetenteId?: IntFilter<"Mensagem"> | number
    destinatarioId?: IntFilter<"Mensagem"> | number
    lida?: BoolFilter<"Mensagem"> | boolean
    lidaEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    editadoEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    criadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    atualizadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    deletadoParaRemetente?: BoolFilter<"Mensagem"> | boolean
    deletadoParaDestinatario?: BoolFilter<"Mensagem"> | boolean
    arquivoUrl?: StringNullableFilter<"Mensagem"> | string | null
    arquivoNome?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTipo?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTamanho?: IntNullableFilter<"Mensagem"> | number | null
    remetente?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
    destinatario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
  }, "id">

  export type MensagemOrderByWithAggregationInput = {
    id?: SortOrder
    conteudo?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    lida?: SortOrder
    lidaEm?: SortOrderInput | SortOrder
    editadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    deletadoParaRemetente?: SortOrder
    deletadoParaDestinatario?: SortOrder
    arquivoUrl?: SortOrderInput | SortOrder
    arquivoNome?: SortOrderInput | SortOrder
    arquivoTipo?: SortOrderInput | SortOrder
    arquivoTamanho?: SortOrderInput | SortOrder
    _count?: MensagemCountOrderByAggregateInput
    _avg?: MensagemAvgOrderByAggregateInput
    _max?: MensagemMaxOrderByAggregateInput
    _min?: MensagemMinOrderByAggregateInput
    _sum?: MensagemSumOrderByAggregateInput
  }

  export type MensagemScalarWhereWithAggregatesInput = {
    AND?: MensagemScalarWhereWithAggregatesInput | MensagemScalarWhereWithAggregatesInput[]
    OR?: MensagemScalarWhereWithAggregatesInput[]
    NOT?: MensagemScalarWhereWithAggregatesInput | MensagemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mensagem"> | number
    conteudo?: StringWithAggregatesFilter<"Mensagem"> | string
    remetenteId?: IntWithAggregatesFilter<"Mensagem"> | number
    destinatarioId?: IntWithAggregatesFilter<"Mensagem"> | number
    lida?: BoolWithAggregatesFilter<"Mensagem"> | boolean
    lidaEm?: DateTimeNullableWithAggregatesFilter<"Mensagem"> | Date | string | null
    editadoEm?: DateTimeNullableWithAggregatesFilter<"Mensagem"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Mensagem"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Mensagem"> | Date | string
    deletadoParaRemetente?: BoolWithAggregatesFilter<"Mensagem"> | boolean
    deletadoParaDestinatario?: BoolWithAggregatesFilter<"Mensagem"> | boolean
    arquivoUrl?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    arquivoNome?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    arquivoTipo?: StringNullableWithAggregatesFilter<"Mensagem"> | string | null
    arquivoTamanho?: IntNullableWithAggregatesFilter<"Mensagem"> | number | null
  }

  export type AvisoWhereInput = {
    AND?: AvisoWhereInput | AvisoWhereInput[]
    OR?: AvisoWhereInput[]
    NOT?: AvisoWhereInput | AvisoWhereInput[]
    id?: IntFilter<"Aviso"> | number
    titulo?: StringFilter<"Aviso"> | string
    conteudo?: StringFilter<"Aviso"> | string
    imagem?: StringNullableFilter<"Aviso"> | string | null
    categoria?: StringFilter<"Aviso"> | string
    autorId?: IntNullableFilter<"Aviso"> | number | null
    autorNome?: StringNullableFilter<"Aviso"> | string | null
    criadoEm?: DateTimeFilter<"Aviso"> | Date | string
    atualizadoEm?: DateTimeFilter<"Aviso"> | Date | string
  }

  export type AvisoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    imagem?: SortOrderInput | SortOrder
    categoria?: SortOrder
    autorId?: SortOrderInput | SortOrder
    autorNome?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AvisoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AvisoWhereInput | AvisoWhereInput[]
    OR?: AvisoWhereInput[]
    NOT?: AvisoWhereInput | AvisoWhereInput[]
    titulo?: StringFilter<"Aviso"> | string
    conteudo?: StringFilter<"Aviso"> | string
    imagem?: StringNullableFilter<"Aviso"> | string | null
    categoria?: StringFilter<"Aviso"> | string
    autorId?: IntNullableFilter<"Aviso"> | number | null
    autorNome?: StringNullableFilter<"Aviso"> | string | null
    criadoEm?: DateTimeFilter<"Aviso"> | Date | string
    atualizadoEm?: DateTimeFilter<"Aviso"> | Date | string
  }, "id">

  export type AvisoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    imagem?: SortOrderInput | SortOrder
    categoria?: SortOrder
    autorId?: SortOrderInput | SortOrder
    autorNome?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: AvisoCountOrderByAggregateInput
    _avg?: AvisoAvgOrderByAggregateInput
    _max?: AvisoMaxOrderByAggregateInput
    _min?: AvisoMinOrderByAggregateInput
    _sum?: AvisoSumOrderByAggregateInput
  }

  export type AvisoScalarWhereWithAggregatesInput = {
    AND?: AvisoScalarWhereWithAggregatesInput | AvisoScalarWhereWithAggregatesInput[]
    OR?: AvisoScalarWhereWithAggregatesInput[]
    NOT?: AvisoScalarWhereWithAggregatesInput | AvisoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Aviso"> | number
    titulo?: StringWithAggregatesFilter<"Aviso"> | string
    conteudo?: StringWithAggregatesFilter<"Aviso"> | string
    imagem?: StringNullableWithAggregatesFilter<"Aviso"> | string | null
    categoria?: StringWithAggregatesFilter<"Aviso"> | string
    autorId?: IntNullableWithAggregatesFilter<"Aviso"> | number | null
    autorNome?: StringNullableWithAggregatesFilter<"Aviso"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Aviso"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Aviso"> | Date | string
  }

  export type EventoWhereInput = {
    AND?: EventoWhereInput | EventoWhereInput[]
    OR?: EventoWhereInput[]
    NOT?: EventoWhereInput | EventoWhereInput[]
    id?: IntFilter<"Evento"> | number
    titulo?: StringFilter<"Evento"> | string
    descricao?: StringFilter<"Evento"> | string
    imagem?: StringNullableFilter<"Evento"> | string | null
    dataEvento?: DateTimeNullableFilter<"Evento"> | Date | string | null
    dataFim?: DateTimeNullableFilter<"Evento"> | Date | string | null
    local?: StringNullableFilter<"Evento"> | string | null
    organizador?: StringNullableFilter<"Evento"> | string | null
    maxParticipantes?: IntNullableFilter<"Evento"> | number | null
    categoria?: StringFilter<"Evento"> | string
    criadoEm?: DateTimeFilter<"Evento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Evento"> | Date | string
  }

  export type EventoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    imagem?: SortOrderInput | SortOrder
    dataEvento?: SortOrderInput | SortOrder
    dataFim?: SortOrderInput | SortOrder
    local?: SortOrderInput | SortOrder
    organizador?: SortOrderInput | SortOrder
    maxParticipantes?: SortOrderInput | SortOrder
    categoria?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EventoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EventoWhereInput | EventoWhereInput[]
    OR?: EventoWhereInput[]
    NOT?: EventoWhereInput | EventoWhereInput[]
    titulo?: StringFilter<"Evento"> | string
    descricao?: StringFilter<"Evento"> | string
    imagem?: StringNullableFilter<"Evento"> | string | null
    dataEvento?: DateTimeNullableFilter<"Evento"> | Date | string | null
    dataFim?: DateTimeNullableFilter<"Evento"> | Date | string | null
    local?: StringNullableFilter<"Evento"> | string | null
    organizador?: StringNullableFilter<"Evento"> | string | null
    maxParticipantes?: IntNullableFilter<"Evento"> | number | null
    categoria?: StringFilter<"Evento"> | string
    criadoEm?: DateTimeFilter<"Evento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Evento"> | Date | string
  }, "id">

  export type EventoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    imagem?: SortOrderInput | SortOrder
    dataEvento?: SortOrderInput | SortOrder
    dataFim?: SortOrderInput | SortOrder
    local?: SortOrderInput | SortOrder
    organizador?: SortOrderInput | SortOrder
    maxParticipantes?: SortOrderInput | SortOrder
    categoria?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: EventoCountOrderByAggregateInput
    _avg?: EventoAvgOrderByAggregateInput
    _max?: EventoMaxOrderByAggregateInput
    _min?: EventoMinOrderByAggregateInput
    _sum?: EventoSumOrderByAggregateInput
  }

  export type EventoScalarWhereWithAggregatesInput = {
    AND?: EventoScalarWhereWithAggregatesInput | EventoScalarWhereWithAggregatesInput[]
    OR?: EventoScalarWhereWithAggregatesInput[]
    NOT?: EventoScalarWhereWithAggregatesInput | EventoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Evento"> | number
    titulo?: StringWithAggregatesFilter<"Evento"> | string
    descricao?: StringWithAggregatesFilter<"Evento"> | string
    imagem?: StringNullableWithAggregatesFilter<"Evento"> | string | null
    dataEvento?: DateTimeNullableWithAggregatesFilter<"Evento"> | Date | string | null
    dataFim?: DateTimeNullableWithAggregatesFilter<"Evento"> | Date | string | null
    local?: StringNullableWithAggregatesFilter<"Evento"> | string | null
    organizador?: StringNullableWithAggregatesFilter<"Evento"> | string | null
    maxParticipantes?: IntNullableWithAggregatesFilter<"Evento"> | number | null
    categoria?: StringWithAggregatesFilter<"Evento"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Evento"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Evento"> | Date | string
  }

  export type ReuniaoWhereInput = {
    AND?: ReuniaoWhereInput | ReuniaoWhereInput[]
    OR?: ReuniaoWhereInput[]
    NOT?: ReuniaoWhereInput | ReuniaoWhereInput[]
    id?: IntFilter<"Reuniao"> | number
    titulo?: StringFilter<"Reuniao"> | string
    descricao?: StringNullableFilter<"Reuniao"> | string | null
    local?: StringFilter<"Reuniao"> | string
    linkMeeting?: StringNullableFilter<"Reuniao"> | string | null
    dataHora?: DateTimeNullableFilter<"Reuniao"> | Date | string | null
    criadoPorId?: IntNullableFilter<"Reuniao"> | number | null
    status?: StringFilter<"Reuniao"> | string
    criadoEm?: DateTimeFilter<"Reuniao"> | Date | string
    atualizadoEm?: DateTimeFilter<"Reuniao"> | Date | string
    criadoPor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    participantes?: ReuniaoParticipanteListRelationFilter
  }

  export type ReuniaoOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    local?: SortOrder
    linkMeeting?: SortOrderInput | SortOrder
    dataHora?: SortOrderInput | SortOrder
    criadoPorId?: SortOrderInput | SortOrder
    status?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    criadoPor?: UsuarioOrderByWithRelationInput
    participantes?: ReuniaoParticipanteOrderByRelationAggregateInput
  }

  export type ReuniaoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReuniaoWhereInput | ReuniaoWhereInput[]
    OR?: ReuniaoWhereInput[]
    NOT?: ReuniaoWhereInput | ReuniaoWhereInput[]
    titulo?: StringFilter<"Reuniao"> | string
    descricao?: StringNullableFilter<"Reuniao"> | string | null
    local?: StringFilter<"Reuniao"> | string
    linkMeeting?: StringNullableFilter<"Reuniao"> | string | null
    dataHora?: DateTimeNullableFilter<"Reuniao"> | Date | string | null
    criadoPorId?: IntNullableFilter<"Reuniao"> | number | null
    status?: StringFilter<"Reuniao"> | string
    criadoEm?: DateTimeFilter<"Reuniao"> | Date | string
    atualizadoEm?: DateTimeFilter<"Reuniao"> | Date | string
    criadoPor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
    participantes?: ReuniaoParticipanteListRelationFilter
  }, "id">

  export type ReuniaoOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    local?: SortOrder
    linkMeeting?: SortOrderInput | SortOrder
    dataHora?: SortOrderInput | SortOrder
    criadoPorId?: SortOrderInput | SortOrder
    status?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: ReuniaoCountOrderByAggregateInput
    _avg?: ReuniaoAvgOrderByAggregateInput
    _max?: ReuniaoMaxOrderByAggregateInput
    _min?: ReuniaoMinOrderByAggregateInput
    _sum?: ReuniaoSumOrderByAggregateInput
  }

  export type ReuniaoScalarWhereWithAggregatesInput = {
    AND?: ReuniaoScalarWhereWithAggregatesInput | ReuniaoScalarWhereWithAggregatesInput[]
    OR?: ReuniaoScalarWhereWithAggregatesInput[]
    NOT?: ReuniaoScalarWhereWithAggregatesInput | ReuniaoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Reuniao"> | number
    titulo?: StringWithAggregatesFilter<"Reuniao"> | string
    descricao?: StringNullableWithAggregatesFilter<"Reuniao"> | string | null
    local?: StringWithAggregatesFilter<"Reuniao"> | string
    linkMeeting?: StringNullableWithAggregatesFilter<"Reuniao"> | string | null
    dataHora?: DateTimeNullableWithAggregatesFilter<"Reuniao"> | Date | string | null
    criadoPorId?: IntNullableWithAggregatesFilter<"Reuniao"> | number | null
    status?: StringWithAggregatesFilter<"Reuniao"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Reuniao"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Reuniao"> | Date | string
  }

  export type ReuniaoParticipanteWhereInput = {
    AND?: ReuniaoParticipanteWhereInput | ReuniaoParticipanteWhereInput[]
    OR?: ReuniaoParticipanteWhereInput[]
    NOT?: ReuniaoParticipanteWhereInput | ReuniaoParticipanteWhereInput[]
    id?: IntFilter<"ReuniaoParticipante"> | number
    reuniaoId?: IntFilter<"ReuniaoParticipante"> | number
    usuarioId?: IntFilter<"ReuniaoParticipante"> | number
    status?: StringFilter<"ReuniaoParticipante"> | string
    confirmadoEm?: DateTimeNullableFilter<"ReuniaoParticipante"> | Date | string | null
    criadoEm?: DateTimeFilter<"ReuniaoParticipante"> | Date | string
    reuniao?: XOR<ReuniaoRelationFilter, ReuniaoWhereInput>
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
  }

  export type ReuniaoParticipanteOrderByWithRelationInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
    status?: SortOrder
    confirmadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    reuniao?: ReuniaoOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type ReuniaoParticipanteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    reuniaoId_usuarioId?: ReuniaoParticipanteReuniaoIdUsuarioIdCompoundUniqueInput
    AND?: ReuniaoParticipanteWhereInput | ReuniaoParticipanteWhereInput[]
    OR?: ReuniaoParticipanteWhereInput[]
    NOT?: ReuniaoParticipanteWhereInput | ReuniaoParticipanteWhereInput[]
    reuniaoId?: IntFilter<"ReuniaoParticipante"> | number
    usuarioId?: IntFilter<"ReuniaoParticipante"> | number
    status?: StringFilter<"ReuniaoParticipante"> | string
    confirmadoEm?: DateTimeNullableFilter<"ReuniaoParticipante"> | Date | string | null
    criadoEm?: DateTimeFilter<"ReuniaoParticipante"> | Date | string
    reuniao?: XOR<ReuniaoRelationFilter, ReuniaoWhereInput>
    usuario?: XOR<UsuarioRelationFilter, UsuarioWhereInput>
  }, "id" | "reuniaoId_usuarioId">

  export type ReuniaoParticipanteOrderByWithAggregationInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
    status?: SortOrder
    confirmadoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: ReuniaoParticipanteCountOrderByAggregateInput
    _avg?: ReuniaoParticipanteAvgOrderByAggregateInput
    _max?: ReuniaoParticipanteMaxOrderByAggregateInput
    _min?: ReuniaoParticipanteMinOrderByAggregateInput
    _sum?: ReuniaoParticipanteSumOrderByAggregateInput
  }

  export type ReuniaoParticipanteScalarWhereWithAggregatesInput = {
    AND?: ReuniaoParticipanteScalarWhereWithAggregatesInput | ReuniaoParticipanteScalarWhereWithAggregatesInput[]
    OR?: ReuniaoParticipanteScalarWhereWithAggregatesInput[]
    NOT?: ReuniaoParticipanteScalarWhereWithAggregatesInput | ReuniaoParticipanteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ReuniaoParticipante"> | number
    reuniaoId?: IntWithAggregatesFilter<"ReuniaoParticipante"> | number
    usuarioId?: IntWithAggregatesFilter<"ReuniaoParticipante"> | number
    status?: StringWithAggregatesFilter<"ReuniaoParticipante"> | string
    confirmadoEm?: DateTimeNullableWithAggregatesFilter<"ReuniaoParticipante"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"ReuniaoParticipante"> | Date | string
  }

  export type RelatorioWhereInput = {
    AND?: RelatorioWhereInput | RelatorioWhereInput[]
    OR?: RelatorioWhereInput[]
    NOT?: RelatorioWhereInput | RelatorioWhereInput[]
    id?: IntFilter<"Relatorio"> | number
    titulo?: StringFilter<"Relatorio"> | string
    conteudo?: StringFilter<"Relatorio"> | string
    tipo?: StringFilter<"Relatorio"> | string
    autorId?: IntNullableFilter<"Relatorio"> | number | null
    dataReferencia?: DateTimeNullableFilter<"Relatorio"> | Date | string | null
    criadoEm?: DateTimeFilter<"Relatorio"> | Date | string
    atualizadoEm?: DateTimeFilter<"Relatorio"> | Date | string
  }

  export type RelatorioOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    tipo?: SortOrder
    autorId?: SortOrderInput | SortOrder
    dataReferencia?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RelatorioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RelatorioWhereInput | RelatorioWhereInput[]
    OR?: RelatorioWhereInput[]
    NOT?: RelatorioWhereInput | RelatorioWhereInput[]
    titulo?: StringFilter<"Relatorio"> | string
    conteudo?: StringFilter<"Relatorio"> | string
    tipo?: StringFilter<"Relatorio"> | string
    autorId?: IntNullableFilter<"Relatorio"> | number | null
    dataReferencia?: DateTimeNullableFilter<"Relatorio"> | Date | string | null
    criadoEm?: DateTimeFilter<"Relatorio"> | Date | string
    atualizadoEm?: DateTimeFilter<"Relatorio"> | Date | string
  }, "id">

  export type RelatorioOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    tipo?: SortOrder
    autorId?: SortOrderInput | SortOrder
    dataReferencia?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: RelatorioCountOrderByAggregateInput
    _avg?: RelatorioAvgOrderByAggregateInput
    _max?: RelatorioMaxOrderByAggregateInput
    _min?: RelatorioMinOrderByAggregateInput
    _sum?: RelatorioSumOrderByAggregateInput
  }

  export type RelatorioScalarWhereWithAggregatesInput = {
    AND?: RelatorioScalarWhereWithAggregatesInput | RelatorioScalarWhereWithAggregatesInput[]
    OR?: RelatorioScalarWhereWithAggregatesInput[]
    NOT?: RelatorioScalarWhereWithAggregatesInput | RelatorioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Relatorio"> | number
    titulo?: StringWithAggregatesFilter<"Relatorio"> | string
    conteudo?: StringWithAggregatesFilter<"Relatorio"> | string
    tipo?: StringWithAggregatesFilter<"Relatorio"> | string
    autorId?: IntNullableWithAggregatesFilter<"Relatorio"> | number | null
    dataReferencia?: DateTimeNullableWithAggregatesFilter<"Relatorio"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Relatorio"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Relatorio"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: IntFilter<"Feedback"> | number
    nome?: StringFilter<"Feedback"> | string
    email?: StringFilter<"Feedback"> | string
    assunto?: StringFilter<"Feedback"> | string
    mensagem?: StringFilter<"Feedback"> | string
    avaliacao?: IntNullableFilter<"Feedback"> | number | null
    categoria?: StringFilter<"Feedback"> | string
    status?: StringFilter<"Feedback"> | string
    resposta?: StringNullableFilter<"Feedback"> | string | null
    respondidoEm?: DateTimeNullableFilter<"Feedback"> | Date | string | null
    usuarioId?: IntNullableFilter<"Feedback"> | number | null
    criadoEm?: DateTimeFilter<"Feedback"> | Date | string
    usuario?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    assunto?: SortOrder
    mensagem?: SortOrder
    avaliacao?: SortOrderInput | SortOrder
    categoria?: SortOrder
    status?: SortOrder
    resposta?: SortOrderInput | SortOrder
    respondidoEm?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    nome?: StringFilter<"Feedback"> | string
    email?: StringFilter<"Feedback"> | string
    assunto?: StringFilter<"Feedback"> | string
    mensagem?: StringFilter<"Feedback"> | string
    avaliacao?: IntNullableFilter<"Feedback"> | number | null
    categoria?: StringFilter<"Feedback"> | string
    status?: StringFilter<"Feedback"> | string
    resposta?: StringNullableFilter<"Feedback"> | string | null
    respondidoEm?: DateTimeNullableFilter<"Feedback"> | Date | string | null
    usuarioId?: IntNullableFilter<"Feedback"> | number | null
    criadoEm?: DateTimeFilter<"Feedback"> | Date | string
    usuario?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    assunto?: SortOrder
    mensagem?: SortOrder
    avaliacao?: SortOrderInput | SortOrder
    categoria?: SortOrder
    status?: SortOrder
    resposta?: SortOrderInput | SortOrder
    respondidoEm?: SortOrderInput | SortOrder
    usuarioId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Feedback"> | number
    nome?: StringWithAggregatesFilter<"Feedback"> | string
    email?: StringWithAggregatesFilter<"Feedback"> | string
    assunto?: StringWithAggregatesFilter<"Feedback"> | string
    mensagem?: StringWithAggregatesFilter<"Feedback"> | string
    avaliacao?: IntNullableWithAggregatesFilter<"Feedback"> | number | null
    categoria?: StringWithAggregatesFilter<"Feedback"> | string
    status?: StringWithAggregatesFilter<"Feedback"> | string
    resposta?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    respondidoEm?: DateTimeNullableWithAggregatesFilter<"Feedback"> | Date | string | null
    usuarioId?: IntNullableWithAggregatesFilter<"Feedback"> | number | null
    criadoEm?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type CodigoProfessorWhereInput = {
    AND?: CodigoProfessorWhereInput | CodigoProfessorWhereInput[]
    OR?: CodigoProfessorWhereInput[]
    NOT?: CodigoProfessorWhereInput | CodigoProfessorWhereInput[]
    id?: IntFilter<"CodigoProfessor"> | number
    codigo?: StringFilter<"CodigoProfessor"> | string
    usado?: BoolFilter<"CodigoProfessor"> | boolean
    professorId?: IntNullableFilter<"CodigoProfessor"> | number | null
    criadoEm?: DateTimeFilter<"CodigoProfessor"> | Date | string
    atualizadoEm?: DateTimeFilter<"CodigoProfessor"> | Date | string
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
  }

  export type CodigoProfessorOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    usado?: SortOrder
    professorId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    professor?: UsuarioOrderByWithRelationInput
  }

  export type CodigoProfessorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigo?: string
    professorId?: number
    AND?: CodigoProfessorWhereInput | CodigoProfessorWhereInput[]
    OR?: CodigoProfessorWhereInput[]
    NOT?: CodigoProfessorWhereInput | CodigoProfessorWhereInput[]
    usado?: BoolFilter<"CodigoProfessor"> | boolean
    criadoEm?: DateTimeFilter<"CodigoProfessor"> | Date | string
    atualizadoEm?: DateTimeFilter<"CodigoProfessor"> | Date | string
    professor?: XOR<UsuarioNullableRelationFilter, UsuarioWhereInput> | null
  }, "id" | "codigo" | "professorId">

  export type CodigoProfessorOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    usado?: SortOrder
    professorId?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CodigoProfessorCountOrderByAggregateInput
    _avg?: CodigoProfessorAvgOrderByAggregateInput
    _max?: CodigoProfessorMaxOrderByAggregateInput
    _min?: CodigoProfessorMinOrderByAggregateInput
    _sum?: CodigoProfessorSumOrderByAggregateInput
  }

  export type CodigoProfessorScalarWhereWithAggregatesInput = {
    AND?: CodigoProfessorScalarWhereWithAggregatesInput | CodigoProfessorScalarWhereWithAggregatesInput[]
    OR?: CodigoProfessorScalarWhereWithAggregatesInput[]
    NOT?: CodigoProfessorScalarWhereWithAggregatesInput | CodigoProfessorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CodigoProfessor"> | number
    codigo?: StringWithAggregatesFilter<"CodigoProfessor"> | string
    usado?: BoolWithAggregatesFilter<"CodigoProfessor"> | boolean
    professorId?: IntNullableWithAggregatesFilter<"CodigoProfessor"> | number | null
    criadoEm?: DateTimeWithAggregatesFilter<"CodigoProfessor"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"CodigoProfessor"> | Date | string
  }

  export type UsuarioCreateInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlunoCreateInput = {
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turma: TurmaCreateNestedOneWithoutAlunosInput
    encarregado?: UsuarioCreateNestedOneWithoutAlunosInput
    curso: CursoCreateNestedOneWithoutAlunosInput
    notas?: NotaCreateNestedManyWithoutAlunoInput
  }

  export type AlunoUncheckedCreateInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    encarregadoId?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutAlunoInput
  }

  export type AlunoUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turma?: TurmaUpdateOneRequiredWithoutAlunosNestedInput
    encarregado?: UsuarioUpdateOneWithoutAlunosNestedInput
    curso?: CursoUpdateOneRequiredWithoutAlunosNestedInput
    notas?: NotaUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoCreateManyInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    encarregadoId?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AlunoUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlunoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaCreateInput = {
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutTurmasInput
    curso?: CursoCreateNestedOneWithoutTurmasInput
    alunos?: AlunoCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaCreateNestedManyWithoutTurmasInput
  }

  export type TurmaUncheckedCreateInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutTurmasInput
  }

  export type TurmaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutTurmasNestedInput
    curso?: CursoUpdateOneWithoutTurmasNestedInput
    alunos?: AlunoUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaCreateManyInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type TurmaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CursoCreateInput = {
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaCreateNestedManyWithoutCursoInput
    alunos?: AlunoCreateNestedManyWithoutCursoInput
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    professores?: UsuarioCreateNestedManyWithoutCursosInput
  }

  export type CursoUncheckedCreateInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutCursoInput
    alunos?: AlunoUncheckedCreateNestedManyWithoutCursoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    professores?: UsuarioUncheckedCreateNestedManyWithoutCursosInput
  }

  export type CursoUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUpdateManyWithoutCursosNestedInput
  }

  export type CursoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUncheckedUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUncheckedUpdateManyWithoutCursosNestedInput
  }

  export type CursoCreateManyInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CursoUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CursoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaCreateInput = {
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    curso: CursoCreateNestedOneWithoutDisciplinasInput
    professor?: UsuarioCreateNestedOneWithoutDisciplinasInput
    notas?: NotaCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaUncheckedCreateInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutDisciplinasNestedInput
    professor?: UsuarioUpdateOneWithoutDisciplinasNestedInput
    notas?: NotaUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaCreateManyInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DisciplinaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaCreateInput = {
    valor: number
    tipo: string
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    aluno: AlunoCreateNestedOneWithoutNotasInput
    disciplina: DisciplinaCreateNestedOneWithoutNotasInput
  }

  export type NotaUncheckedCreateInput = {
    id?: number
    valor: number
    tipo: string
    alunoId: number
    disciplinaId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaUpdateInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    aluno?: AlunoUpdateOneRequiredWithoutNotasNestedInput
    disciplina?: DisciplinaUpdateOneRequiredWithoutNotasNestedInput
  }

  export type NotaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alunoId?: IntFieldUpdateOperationsInput | number
    disciplinaId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaCreateManyInput = {
    id?: number
    valor: number
    tipo: string
    alunoId: number
    disciplinaId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaUpdateManyMutationInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alunoId?: IntFieldUpdateOperationsInput | number
    disciplinaId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemCreateInput = {
    conteudo: string
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
    remetente: UsuarioCreateNestedOneWithoutMensagensEnviadasInput
    destinatario: UsuarioCreateNestedOneWithoutMensagensRecebidasInput
  }

  export type MensagemUncheckedCreateInput = {
    id?: number
    conteudo: string
    remetenteId: number
    destinatarioId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type MensagemUpdateInput = {
    conteudo?: StringFieldUpdateOperationsInput | string
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
    remetente?: UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInput
    destinatario?: UsuarioUpdateOneRequiredWithoutMensagensRecebidasNestedInput
  }

  export type MensagemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    remetenteId?: IntFieldUpdateOperationsInput | number
    destinatarioId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MensagemCreateManyInput = {
    id?: number
    conteudo: string
    remetenteId: number
    destinatarioId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type MensagemUpdateManyMutationInput = {
    conteudo?: StringFieldUpdateOperationsInput | string
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MensagemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    remetenteId?: IntFieldUpdateOperationsInput | number
    destinatarioId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AvisoCreateInput = {
    titulo: string
    conteudo: string
    imagem?: string | null
    categoria?: string
    autorId?: number | null
    autorNome?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AvisoUncheckedCreateInput = {
    id?: number
    titulo: string
    conteudo: string
    imagem?: string | null
    categoria?: string
    autorId?: number | null
    autorNome?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AvisoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    autorNome?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    autorNome?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisoCreateManyInput = {
    id?: number
    titulo: string
    conteudo: string
    imagem?: string | null
    categoria?: string
    autorId?: number | null
    autorNome?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AvisoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    autorNome?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvisoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    autorNome?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventoCreateInput = {
    titulo: string
    descricao: string
    imagem?: string | null
    dataEvento?: Date | string | null
    dataFim?: Date | string | null
    local?: string | null
    organizador?: string | null
    maxParticipantes?: number | null
    categoria?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EventoUncheckedCreateInput = {
    id?: number
    titulo: string
    descricao: string
    imagem?: string | null
    dataEvento?: Date | string | null
    dataFim?: Date | string | null
    local?: string | null
    organizador?: string | null
    maxParticipantes?: number | null
    categoria?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EventoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    dataEvento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    local?: NullableStringFieldUpdateOperationsInput | string | null
    organizador?: NullableStringFieldUpdateOperationsInput | string | null
    maxParticipantes?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    dataEvento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    local?: NullableStringFieldUpdateOperationsInput | string | null
    organizador?: NullableStringFieldUpdateOperationsInput | string | null
    maxParticipantes?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventoCreateManyInput = {
    id?: number
    titulo: string
    descricao: string
    imagem?: string | null
    dataEvento?: Date | string | null
    dataFim?: Date | string | null
    local?: string | null
    organizador?: string | null
    maxParticipantes?: number | null
    categoria?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type EventoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    dataEvento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    local?: NullableStringFieldUpdateOperationsInput | string | null
    organizador?: NullableStringFieldUpdateOperationsInput | string | null
    maxParticipantes?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    dataEvento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataFim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    local?: NullableStringFieldUpdateOperationsInput | string | null
    organizador?: NullableStringFieldUpdateOperationsInput | string | null
    maxParticipantes?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoCreateInput = {
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    criadoPor?: UsuarioCreateNestedOneWithoutReunioesAgendadasInput
    participantes?: ReuniaoParticipanteCreateNestedManyWithoutReuniaoInput
  }

  export type ReuniaoUncheckedCreateInput = {
    id?: number
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    criadoPorId?: number | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    participantes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutReuniaoInput
  }

  export type ReuniaoUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    criadoPor?: UsuarioUpdateOneWithoutReunioesAgendadasNestedInput
    participantes?: ReuniaoParticipanteUpdateManyWithoutReuniaoNestedInput
  }

  export type ReuniaoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    participantes?: ReuniaoParticipanteUncheckedUpdateManyWithoutReuniaoNestedInput
  }

  export type ReuniaoCreateManyInput = {
    id?: number
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    criadoPorId?: number | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ReuniaoUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteCreateInput = {
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
    reuniao: ReuniaoCreateNestedOneWithoutParticipantesInput
    usuario: UsuarioCreateNestedOneWithoutReunioesInput
  }

  export type ReuniaoParticipanteUncheckedCreateInput = {
    id?: number
    reuniaoId: number
    usuarioId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoParticipanteUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    reuniao?: ReuniaoUpdateOneRequiredWithoutParticipantesNestedInput
    usuario?: UsuarioUpdateOneRequiredWithoutReunioesNestedInput
  }

  export type ReuniaoParticipanteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    reuniaoId?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteCreateManyInput = {
    id?: number
    reuniaoId: number
    usuarioId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoParticipanteUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    reuniaoId?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioCreateInput = {
    titulo: string
    conteudo: string
    tipo?: string
    autorId?: number | null
    dataReferencia?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RelatorioUncheckedCreateInput = {
    id?: number
    titulo: string
    conteudo: string
    tipo?: string
    autorId?: number | null
    dataReferencia?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RelatorioUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    dataReferencia?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    dataReferencia?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioCreateManyInput = {
    id?: number
    titulo: string
    conteudo: string
    tipo?: string
    autorId?: number | null
    dataReferencia?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type RelatorioUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    dataReferencia?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelatorioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    conteudo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    autorId?: NullableIntFieldUpdateOperationsInput | number | null
    dataReferencia?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    criadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: number
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    usuarioId?: number | null
    criadoEm?: Date | string
  }

  export type FeedbackUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: number
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    usuarioId?: number | null
    criadoEm?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuarioId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodigoProfessorCreateInput = {
    codigo: string
    usado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutCodigoProfessorInput
  }

  export type CodigoProfessorUncheckedCreateInput = {
    id?: number
    codigo: string
    usado?: boolean
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CodigoProfessorUpdateInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutCodigoProfessorNestedInput
  }

  export type CodigoProfessorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodigoProfessorCreateManyInput = {
    id?: number
    codigo: string
    usado?: boolean
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CodigoProfessorUpdateManyMutationInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodigoProfessorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AlunoListRelationFilter = {
    every?: AlunoWhereInput
    some?: AlunoWhereInput
    none?: AlunoWhereInput
  }

  export type TurmaListRelationFilter = {
    every?: TurmaWhereInput
    some?: TurmaWhereInput
    none?: TurmaWhereInput
  }

  export type DisciplinaListRelationFilter = {
    every?: DisciplinaWhereInput
    some?: DisciplinaWhereInput
    none?: DisciplinaWhereInput
  }

  export type CursoListRelationFilter = {
    every?: CursoWhereInput
    some?: CursoWhereInput
    none?: CursoWhereInput
  }

  export type MensagemListRelationFilter = {
    every?: MensagemWhereInput
    some?: MensagemWhereInput
    none?: MensagemWhereInput
  }

  export type ReuniaoParticipanteListRelationFilter = {
    every?: ReuniaoParticipanteWhereInput
    some?: ReuniaoParticipanteWhereInput
    none?: ReuniaoParticipanteWhereInput
  }

  export type ReuniaoListRelationFilter = {
    every?: ReuniaoWhereInput
    some?: ReuniaoWhereInput
    none?: ReuniaoWhereInput
  }

  export type CodigoProfessorNullableRelationFilter = {
    is?: CodigoProfessorWhereInput | null
    isNot?: CodigoProfessorWhereInput | null
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlunoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TurmaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisciplinaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CursoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MensagemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReuniaoParticipanteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReuniaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    perfil?: SortOrder
    imagem?: SortOrder
    relacaoEducando?: SortOrder
    codigoVerificacao?: SortOrder
    ultimoLogin?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    perfil?: SortOrder
    imagem?: SortOrder
    relacaoEducando?: SortOrder
    codigoVerificacao?: SortOrder
    ultimoLogin?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    perfil?: SortOrder
    imagem?: SortOrder
    relacaoEducando?: SortOrder
    codigoVerificacao?: SortOrder
    ultimoLogin?: SortOrder
    ativo?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TurmaRelationFilter = {
    is?: TurmaWhereInput
    isNot?: TurmaWhereInput
  }

  export type UsuarioNullableRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type CursoRelationFilter = {
    is?: CursoWhereInput
    isNot?: CursoWhereInput
  }

  export type NotaListRelationFilter = {
    every?: NotaWhereInput
    some?: NotaWhereInput
    none?: NotaWhereInput
  }

  export type NotaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlunoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    matricula?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    imagem?: SortOrder
    classe?: SortOrder
    dataNascimento?: SortOrder
    endereco?: SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AlunoAvgOrderByAggregateInput = {
    id?: SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrder
    cursoId?: SortOrder
  }

  export type AlunoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    matricula?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    imagem?: SortOrder
    classe?: SortOrder
    dataNascimento?: SortOrder
    endereco?: SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AlunoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    matricula?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
    imagem?: SortOrder
    classe?: SortOrder
    dataNascimento?: SortOrder
    endereco?: SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AlunoSumOrderByAggregateInput = {
    id?: SortOrder
    turmaId?: SortOrder
    encarregadoId?: SortOrder
    cursoId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CursoNullableRelationFilter = {
    is?: CursoWhereInput | null
    isNot?: CursoWhereInput | null
  }

  export type TurmaNomeAnoCompoundUniqueInput = {
    nome: string
    ano: number
  }

  export type TurmaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ano?: SortOrder
    semestre?: SortOrder
    capacidade?: SortOrder
    turno?: SortOrder
    professorId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type TurmaAvgOrderByAggregateInput = {
    id?: SortOrder
    ano?: SortOrder
    semestre?: SortOrder
    capacidade?: SortOrder
    professorId?: SortOrder
    cursoId?: SortOrder
  }

  export type TurmaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ano?: SortOrder
    semestre?: SortOrder
    capacidade?: SortOrder
    turno?: SortOrder
    professorId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type TurmaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    ano?: SortOrder
    semestre?: SortOrder
    capacidade?: SortOrder
    turno?: SortOrder
    professorId?: SortOrder
    cursoId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type TurmaSumOrderByAggregateInput = {
    id?: SortOrder
    ano?: SortOrder
    semestre?: SortOrder
    capacidade?: SortOrder
    professorId?: SortOrder
    cursoId?: SortOrder
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CursoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    duracaoMeses?: SortOrder
    nivel?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CursoAvgOrderByAggregateInput = {
    id?: SortOrder
    cargaHoraria?: SortOrder
    duracaoMeses?: SortOrder
  }

  export type CursoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    duracaoMeses?: SortOrder
    nivel?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CursoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    duracaoMeses?: SortOrder
    nivel?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CursoSumOrderByAggregateInput = {
    id?: SortOrder
    cargaHoraria?: SortOrder
    duracaoMeses?: SortOrder
  }

  export type DisciplinaNomeCursoIdCompoundUniqueInput = {
    nome: string
    cursoId: number
  }

  export type DisciplinaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    semestre?: SortOrder
    cursoId?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DisciplinaAvgOrderByAggregateInput = {
    id?: SortOrder
    cargaHoraria?: SortOrder
    semestre?: SortOrder
    cursoId?: SortOrder
    professorId?: SortOrder
  }

  export type DisciplinaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    semestre?: SortOrder
    cursoId?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DisciplinaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    codigo?: SortOrder
    descricao?: SortOrder
    cargaHoraria?: SortOrder
    semestre?: SortOrder
    cursoId?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type DisciplinaSumOrderByAggregateInput = {
    id?: SortOrder
    cargaHoraria?: SortOrder
    semestre?: SortOrder
    cursoId?: SortOrder
    professorId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AlunoRelationFilter = {
    is?: AlunoWhereInput
    isNot?: AlunoWhereInput
  }

  export type DisciplinaRelationFilter = {
    is?: DisciplinaWhereInput
    isNot?: DisciplinaWhereInput
  }

  export type NotaAlunoIdDisciplinaIdTipoSemestreCompoundUniqueInput = {
    alunoId: number
    disciplinaId: number
    tipo: string
    semestre: number
  }

  export type NotaCountOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NotaAvgOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
  }

  export type NotaMaxOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NotaMinOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
    observacao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type NotaSumOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    alunoId?: SortOrder
    disciplinaId?: SortOrder
    semestre?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UsuarioRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type MensagemCountOrderByAggregateInput = {
    id?: SortOrder
    conteudo?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    lida?: SortOrder
    lidaEm?: SortOrder
    editadoEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    deletadoParaRemetente?: SortOrder
    deletadoParaDestinatario?: SortOrder
    arquivoUrl?: SortOrder
    arquivoNome?: SortOrder
    arquivoTipo?: SortOrder
    arquivoTamanho?: SortOrder
  }

  export type MensagemAvgOrderByAggregateInput = {
    id?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    arquivoTamanho?: SortOrder
  }

  export type MensagemMaxOrderByAggregateInput = {
    id?: SortOrder
    conteudo?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    lida?: SortOrder
    lidaEm?: SortOrder
    editadoEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    deletadoParaRemetente?: SortOrder
    deletadoParaDestinatario?: SortOrder
    arquivoUrl?: SortOrder
    arquivoNome?: SortOrder
    arquivoTipo?: SortOrder
    arquivoTamanho?: SortOrder
  }

  export type MensagemMinOrderByAggregateInput = {
    id?: SortOrder
    conteudo?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    lida?: SortOrder
    lidaEm?: SortOrder
    editadoEm?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    deletadoParaRemetente?: SortOrder
    deletadoParaDestinatario?: SortOrder
    arquivoUrl?: SortOrder
    arquivoNome?: SortOrder
    arquivoTipo?: SortOrder
    arquivoTamanho?: SortOrder
  }

  export type MensagemSumOrderByAggregateInput = {
    id?: SortOrder
    remetenteId?: SortOrder
    destinatarioId?: SortOrder
    arquivoTamanho?: SortOrder
  }

  export type AvisoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    imagem?: SortOrder
    categoria?: SortOrder
    autorId?: SortOrder
    autorNome?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AvisoAvgOrderByAggregateInput = {
    id?: SortOrder
    autorId?: SortOrder
  }

  export type AvisoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    imagem?: SortOrder
    categoria?: SortOrder
    autorId?: SortOrder
    autorNome?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AvisoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    imagem?: SortOrder
    categoria?: SortOrder
    autorId?: SortOrder
    autorNome?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type AvisoSumOrderByAggregateInput = {
    id?: SortOrder
    autorId?: SortOrder
  }

  export type EventoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    imagem?: SortOrder
    dataEvento?: SortOrder
    dataFim?: SortOrder
    local?: SortOrder
    organizador?: SortOrder
    maxParticipantes?: SortOrder
    categoria?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EventoAvgOrderByAggregateInput = {
    id?: SortOrder
    maxParticipantes?: SortOrder
  }

  export type EventoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    imagem?: SortOrder
    dataEvento?: SortOrder
    dataFim?: SortOrder
    local?: SortOrder
    organizador?: SortOrder
    maxParticipantes?: SortOrder
    categoria?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EventoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    imagem?: SortOrder
    dataEvento?: SortOrder
    dataFim?: SortOrder
    local?: SortOrder
    organizador?: SortOrder
    maxParticipantes?: SortOrder
    categoria?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type EventoSumOrderByAggregateInput = {
    id?: SortOrder
    maxParticipantes?: SortOrder
  }

  export type ReuniaoCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    local?: SortOrder
    linkMeeting?: SortOrder
    dataHora?: SortOrder
    criadoPorId?: SortOrder
    status?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ReuniaoAvgOrderByAggregateInput = {
    id?: SortOrder
    criadoPorId?: SortOrder
  }

  export type ReuniaoMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    local?: SortOrder
    linkMeeting?: SortOrder
    dataHora?: SortOrder
    criadoPorId?: SortOrder
    status?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ReuniaoMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    local?: SortOrder
    linkMeeting?: SortOrder
    dataHora?: SortOrder
    criadoPorId?: SortOrder
    status?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ReuniaoSumOrderByAggregateInput = {
    id?: SortOrder
    criadoPorId?: SortOrder
  }

  export type ReuniaoRelationFilter = {
    is?: ReuniaoWhereInput
    isNot?: ReuniaoWhereInput
  }

  export type ReuniaoParticipanteReuniaoIdUsuarioIdCompoundUniqueInput = {
    reuniaoId: number
    usuarioId: number
  }

  export type ReuniaoParticipanteCountOrderByAggregateInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
    status?: SortOrder
    confirmadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type ReuniaoParticipanteAvgOrderByAggregateInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
  }

  export type ReuniaoParticipanteMaxOrderByAggregateInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
    status?: SortOrder
    confirmadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type ReuniaoParticipanteMinOrderByAggregateInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
    status?: SortOrder
    confirmadoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type ReuniaoParticipanteSumOrderByAggregateInput = {
    id?: SortOrder
    reuniaoId?: SortOrder
    usuarioId?: SortOrder
  }

  export type RelatorioCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    tipo?: SortOrder
    autorId?: SortOrder
    dataReferencia?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RelatorioAvgOrderByAggregateInput = {
    id?: SortOrder
    autorId?: SortOrder
  }

  export type RelatorioMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    tipo?: SortOrder
    autorId?: SortOrder
    dataReferencia?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RelatorioMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    conteudo?: SortOrder
    tipo?: SortOrder
    autorId?: SortOrder
    dataReferencia?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type RelatorioSumOrderByAggregateInput = {
    id?: SortOrder
    autorId?: SortOrder
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    assunto?: SortOrder
    mensagem?: SortOrder
    avaliacao?: SortOrder
    categoria?: SortOrder
    status?: SortOrder
    resposta?: SortOrder
    respondidoEm?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    avaliacao?: SortOrder
    usuarioId?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    assunto?: SortOrder
    mensagem?: SortOrder
    avaliacao?: SortOrder
    categoria?: SortOrder
    status?: SortOrder
    resposta?: SortOrder
    respondidoEm?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    assunto?: SortOrder
    mensagem?: SortOrder
    avaliacao?: SortOrder
    categoria?: SortOrder
    status?: SortOrder
    resposta?: SortOrder
    respondidoEm?: SortOrder
    usuarioId?: SortOrder
    criadoEm?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    id?: SortOrder
    avaliacao?: SortOrder
    usuarioId?: SortOrder
  }

  export type CodigoProfessorCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    usado?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CodigoProfessorAvgOrderByAggregateInput = {
    id?: SortOrder
    professorId?: SortOrder
  }

  export type CodigoProfessorMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    usado?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CodigoProfessorMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    usado?: SortOrder
    professorId?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CodigoProfessorSumOrderByAggregateInput = {
    id?: SortOrder
    professorId?: SortOrder
  }

  export type AlunoCreateNestedManyWithoutEncarregadoInput = {
    create?: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput> | AlunoCreateWithoutEncarregadoInput[] | AlunoUncheckedCreateWithoutEncarregadoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutEncarregadoInput | AlunoCreateOrConnectWithoutEncarregadoInput[]
    createMany?: AlunoCreateManyEncarregadoInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type TurmaCreateNestedManyWithoutProfessorInput = {
    create?: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput> | TurmaCreateWithoutProfessorInput[] | TurmaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutProfessorInput | TurmaCreateOrConnectWithoutProfessorInput[]
    createMany?: TurmaCreateManyProfessorInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type DisciplinaCreateNestedManyWithoutProfessorInput = {
    create?: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput> | DisciplinaCreateWithoutProfessorInput[] | DisciplinaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutProfessorInput | DisciplinaCreateOrConnectWithoutProfessorInput[]
    createMany?: DisciplinaCreateManyProfessorInputEnvelope
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type CursoCreateNestedManyWithoutProfessoresInput = {
    create?: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput> | CursoCreateWithoutProfessoresInput[] | CursoUncheckedCreateWithoutProfessoresInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutProfessoresInput | CursoCreateOrConnectWithoutProfessoresInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
  }

  export type MensagemCreateNestedManyWithoutRemetenteInput = {
    create?: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput> | MensagemCreateWithoutRemetenteInput[] | MensagemUncheckedCreateWithoutRemetenteInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutRemetenteInput | MensagemCreateOrConnectWithoutRemetenteInput[]
    createMany?: MensagemCreateManyRemetenteInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type MensagemCreateNestedManyWithoutDestinatarioInput = {
    create?: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput> | MensagemCreateWithoutDestinatarioInput[] | MensagemUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutDestinatarioInput | MensagemCreateOrConnectWithoutDestinatarioInput[]
    createMany?: MensagemCreateManyDestinatarioInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput> | ReuniaoParticipanteCreateWithoutUsuarioInput[] | ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput | ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput[]
    createMany?: ReuniaoParticipanteCreateManyUsuarioInputEnvelope
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
  }

  export type ReuniaoCreateNestedManyWithoutCriadoPorInput = {
    create?: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput> | ReuniaoCreateWithoutCriadoPorInput[] | ReuniaoUncheckedCreateWithoutCriadoPorInput[]
    connectOrCreate?: ReuniaoCreateOrConnectWithoutCriadoPorInput | ReuniaoCreateOrConnectWithoutCriadoPorInput[]
    createMany?: ReuniaoCreateManyCriadoPorInputEnvelope
    connect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
  }

  export type CodigoProfessorCreateNestedOneWithoutProfessorInput = {
    create?: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
    connectOrCreate?: CodigoProfessorCreateOrConnectWithoutProfessorInput
    connect?: CodigoProfessorWhereUniqueInput
  }

  export type FeedbackCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput> | FeedbackCreateWithoutUsuarioInput[] | FeedbackUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUsuarioInput | FeedbackCreateOrConnectWithoutUsuarioInput[]
    createMany?: FeedbackCreateManyUsuarioInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type AlunoUncheckedCreateNestedManyWithoutEncarregadoInput = {
    create?: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput> | AlunoCreateWithoutEncarregadoInput[] | AlunoUncheckedCreateWithoutEncarregadoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutEncarregadoInput | AlunoCreateOrConnectWithoutEncarregadoInput[]
    createMany?: AlunoCreateManyEncarregadoInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type TurmaUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput> | TurmaCreateWithoutProfessorInput[] | TurmaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutProfessorInput | TurmaCreateOrConnectWithoutProfessorInput[]
    createMany?: TurmaCreateManyProfessorInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type DisciplinaUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput> | DisciplinaCreateWithoutProfessorInput[] | DisciplinaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutProfessorInput | DisciplinaCreateOrConnectWithoutProfessorInput[]
    createMany?: DisciplinaCreateManyProfessorInputEnvelope
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type CursoUncheckedCreateNestedManyWithoutProfessoresInput = {
    create?: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput> | CursoCreateWithoutProfessoresInput[] | CursoUncheckedCreateWithoutProfessoresInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutProfessoresInput | CursoCreateOrConnectWithoutProfessoresInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
  }

  export type MensagemUncheckedCreateNestedManyWithoutRemetenteInput = {
    create?: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput> | MensagemCreateWithoutRemetenteInput[] | MensagemUncheckedCreateWithoutRemetenteInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutRemetenteInput | MensagemCreateOrConnectWithoutRemetenteInput[]
    createMany?: MensagemCreateManyRemetenteInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type MensagemUncheckedCreateNestedManyWithoutDestinatarioInput = {
    create?: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput> | MensagemCreateWithoutDestinatarioInput[] | MensagemUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutDestinatarioInput | MensagemCreateOrConnectWithoutDestinatarioInput[]
    createMany?: MensagemCreateManyDestinatarioInputEnvelope
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
  }

  export type ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput> | ReuniaoParticipanteCreateWithoutUsuarioInput[] | ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput | ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput[]
    createMany?: ReuniaoParticipanteCreateManyUsuarioInputEnvelope
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
  }

  export type ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput = {
    create?: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput> | ReuniaoCreateWithoutCriadoPorInput[] | ReuniaoUncheckedCreateWithoutCriadoPorInput[]
    connectOrCreate?: ReuniaoCreateOrConnectWithoutCriadoPorInput | ReuniaoCreateOrConnectWithoutCriadoPorInput[]
    createMany?: ReuniaoCreateManyCriadoPorInputEnvelope
    connect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
  }

  export type CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput = {
    create?: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
    connectOrCreate?: CodigoProfessorCreateOrConnectWithoutProfessorInput
    connect?: CodigoProfessorWhereUniqueInput
  }

  export type FeedbackUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput> | FeedbackCreateWithoutUsuarioInput[] | FeedbackUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUsuarioInput | FeedbackCreateOrConnectWithoutUsuarioInput[]
    createMany?: FeedbackCreateManyUsuarioInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AlunoUpdateManyWithoutEncarregadoNestedInput = {
    create?: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput> | AlunoCreateWithoutEncarregadoInput[] | AlunoUncheckedCreateWithoutEncarregadoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutEncarregadoInput | AlunoCreateOrConnectWithoutEncarregadoInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutEncarregadoInput | AlunoUpsertWithWhereUniqueWithoutEncarregadoInput[]
    createMany?: AlunoCreateManyEncarregadoInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutEncarregadoInput | AlunoUpdateWithWhereUniqueWithoutEncarregadoInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutEncarregadoInput | AlunoUpdateManyWithWhereWithoutEncarregadoInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type TurmaUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput> | TurmaCreateWithoutProfessorInput[] | TurmaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutProfessorInput | TurmaCreateOrConnectWithoutProfessorInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutProfessorInput | TurmaUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: TurmaCreateManyProfessorInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutProfessorInput | TurmaUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutProfessorInput | TurmaUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type DisciplinaUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput> | DisciplinaCreateWithoutProfessorInput[] | DisciplinaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutProfessorInput | DisciplinaCreateOrConnectWithoutProfessorInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutProfessorInput | DisciplinaUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: DisciplinaCreateManyProfessorInputEnvelope
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutProfessorInput | DisciplinaUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutProfessorInput | DisciplinaUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type CursoUpdateManyWithoutProfessoresNestedInput = {
    create?: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput> | CursoCreateWithoutProfessoresInput[] | CursoUncheckedCreateWithoutProfessoresInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutProfessoresInput | CursoCreateOrConnectWithoutProfessoresInput[]
    upsert?: CursoUpsertWithWhereUniqueWithoutProfessoresInput | CursoUpsertWithWhereUniqueWithoutProfessoresInput[]
    set?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    disconnect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    delete?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    update?: CursoUpdateWithWhereUniqueWithoutProfessoresInput | CursoUpdateWithWhereUniqueWithoutProfessoresInput[]
    updateMany?: CursoUpdateManyWithWhereWithoutProfessoresInput | CursoUpdateManyWithWhereWithoutProfessoresInput[]
    deleteMany?: CursoScalarWhereInput | CursoScalarWhereInput[]
  }

  export type MensagemUpdateManyWithoutRemetenteNestedInput = {
    create?: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput> | MensagemCreateWithoutRemetenteInput[] | MensagemUncheckedCreateWithoutRemetenteInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutRemetenteInput | MensagemCreateOrConnectWithoutRemetenteInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutRemetenteInput | MensagemUpsertWithWhereUniqueWithoutRemetenteInput[]
    createMany?: MensagemCreateManyRemetenteInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutRemetenteInput | MensagemUpdateWithWhereUniqueWithoutRemetenteInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutRemetenteInput | MensagemUpdateManyWithWhereWithoutRemetenteInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type MensagemUpdateManyWithoutDestinatarioNestedInput = {
    create?: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput> | MensagemCreateWithoutDestinatarioInput[] | MensagemUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutDestinatarioInput | MensagemCreateOrConnectWithoutDestinatarioInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutDestinatarioInput | MensagemUpsertWithWhereUniqueWithoutDestinatarioInput[]
    createMany?: MensagemCreateManyDestinatarioInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutDestinatarioInput | MensagemUpdateWithWhereUniqueWithoutDestinatarioInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutDestinatarioInput | MensagemUpdateManyWithWhereWithoutDestinatarioInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput> | ReuniaoParticipanteCreateWithoutUsuarioInput[] | ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput | ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput[]
    upsert?: ReuniaoParticipanteUpsertWithWhereUniqueWithoutUsuarioInput | ReuniaoParticipanteUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ReuniaoParticipanteCreateManyUsuarioInputEnvelope
    set?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    disconnect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    delete?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    update?: ReuniaoParticipanteUpdateWithWhereUniqueWithoutUsuarioInput | ReuniaoParticipanteUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ReuniaoParticipanteUpdateManyWithWhereWithoutUsuarioInput | ReuniaoParticipanteUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
  }

  export type ReuniaoUpdateManyWithoutCriadoPorNestedInput = {
    create?: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput> | ReuniaoCreateWithoutCriadoPorInput[] | ReuniaoUncheckedCreateWithoutCriadoPorInput[]
    connectOrCreate?: ReuniaoCreateOrConnectWithoutCriadoPorInput | ReuniaoCreateOrConnectWithoutCriadoPorInput[]
    upsert?: ReuniaoUpsertWithWhereUniqueWithoutCriadoPorInput | ReuniaoUpsertWithWhereUniqueWithoutCriadoPorInput[]
    createMany?: ReuniaoCreateManyCriadoPorInputEnvelope
    set?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    disconnect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    delete?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    connect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    update?: ReuniaoUpdateWithWhereUniqueWithoutCriadoPorInput | ReuniaoUpdateWithWhereUniqueWithoutCriadoPorInput[]
    updateMany?: ReuniaoUpdateManyWithWhereWithoutCriadoPorInput | ReuniaoUpdateManyWithWhereWithoutCriadoPorInput[]
    deleteMany?: ReuniaoScalarWhereInput | ReuniaoScalarWhereInput[]
  }

  export type CodigoProfessorUpdateOneWithoutProfessorNestedInput = {
    create?: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
    connectOrCreate?: CodigoProfessorCreateOrConnectWithoutProfessorInput
    upsert?: CodigoProfessorUpsertWithoutProfessorInput
    disconnect?: CodigoProfessorWhereInput | boolean
    delete?: CodigoProfessorWhereInput | boolean
    connect?: CodigoProfessorWhereUniqueInput
    update?: XOR<XOR<CodigoProfessorUpdateToOneWithWhereWithoutProfessorInput, CodigoProfessorUpdateWithoutProfessorInput>, CodigoProfessorUncheckedUpdateWithoutProfessorInput>
  }

  export type FeedbackUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput> | FeedbackCreateWithoutUsuarioInput[] | FeedbackUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUsuarioInput | FeedbackCreateOrConnectWithoutUsuarioInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUsuarioInput | FeedbackUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: FeedbackCreateManyUsuarioInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUsuarioInput | FeedbackUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUsuarioInput | FeedbackUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput = {
    create?: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput> | AlunoCreateWithoutEncarregadoInput[] | AlunoUncheckedCreateWithoutEncarregadoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutEncarregadoInput | AlunoCreateOrConnectWithoutEncarregadoInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutEncarregadoInput | AlunoUpsertWithWhereUniqueWithoutEncarregadoInput[]
    createMany?: AlunoCreateManyEncarregadoInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutEncarregadoInput | AlunoUpdateWithWhereUniqueWithoutEncarregadoInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutEncarregadoInput | AlunoUpdateManyWithWhereWithoutEncarregadoInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type TurmaUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput> | TurmaCreateWithoutProfessorInput[] | TurmaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutProfessorInput | TurmaCreateOrConnectWithoutProfessorInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutProfessorInput | TurmaUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: TurmaCreateManyProfessorInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutProfessorInput | TurmaUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutProfessorInput | TurmaUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput> | DisciplinaCreateWithoutProfessorInput[] | DisciplinaUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutProfessorInput | DisciplinaCreateOrConnectWithoutProfessorInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutProfessorInput | DisciplinaUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: DisciplinaCreateManyProfessorInputEnvelope
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutProfessorInput | DisciplinaUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutProfessorInput | DisciplinaUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type CursoUncheckedUpdateManyWithoutProfessoresNestedInput = {
    create?: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput> | CursoCreateWithoutProfessoresInput[] | CursoUncheckedCreateWithoutProfessoresInput[]
    connectOrCreate?: CursoCreateOrConnectWithoutProfessoresInput | CursoCreateOrConnectWithoutProfessoresInput[]
    upsert?: CursoUpsertWithWhereUniqueWithoutProfessoresInput | CursoUpsertWithWhereUniqueWithoutProfessoresInput[]
    set?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    disconnect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    delete?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    connect?: CursoWhereUniqueInput | CursoWhereUniqueInput[]
    update?: CursoUpdateWithWhereUniqueWithoutProfessoresInput | CursoUpdateWithWhereUniqueWithoutProfessoresInput[]
    updateMany?: CursoUpdateManyWithWhereWithoutProfessoresInput | CursoUpdateManyWithWhereWithoutProfessoresInput[]
    deleteMany?: CursoScalarWhereInput | CursoScalarWhereInput[]
  }

  export type MensagemUncheckedUpdateManyWithoutRemetenteNestedInput = {
    create?: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput> | MensagemCreateWithoutRemetenteInput[] | MensagemUncheckedCreateWithoutRemetenteInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutRemetenteInput | MensagemCreateOrConnectWithoutRemetenteInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutRemetenteInput | MensagemUpsertWithWhereUniqueWithoutRemetenteInput[]
    createMany?: MensagemCreateManyRemetenteInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutRemetenteInput | MensagemUpdateWithWhereUniqueWithoutRemetenteInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutRemetenteInput | MensagemUpdateManyWithWhereWithoutRemetenteInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput = {
    create?: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput> | MensagemCreateWithoutDestinatarioInput[] | MensagemUncheckedCreateWithoutDestinatarioInput[]
    connectOrCreate?: MensagemCreateOrConnectWithoutDestinatarioInput | MensagemCreateOrConnectWithoutDestinatarioInput[]
    upsert?: MensagemUpsertWithWhereUniqueWithoutDestinatarioInput | MensagemUpsertWithWhereUniqueWithoutDestinatarioInput[]
    createMany?: MensagemCreateManyDestinatarioInputEnvelope
    set?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    disconnect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    delete?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    connect?: MensagemWhereUniqueInput | MensagemWhereUniqueInput[]
    update?: MensagemUpdateWithWhereUniqueWithoutDestinatarioInput | MensagemUpdateWithWhereUniqueWithoutDestinatarioInput[]
    updateMany?: MensagemUpdateManyWithWhereWithoutDestinatarioInput | MensagemUpdateManyWithWhereWithoutDestinatarioInput[]
    deleteMany?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
  }

  export type ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput> | ReuniaoParticipanteCreateWithoutUsuarioInput[] | ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput | ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput[]
    upsert?: ReuniaoParticipanteUpsertWithWhereUniqueWithoutUsuarioInput | ReuniaoParticipanteUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ReuniaoParticipanteCreateManyUsuarioInputEnvelope
    set?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    disconnect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    delete?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    update?: ReuniaoParticipanteUpdateWithWhereUniqueWithoutUsuarioInput | ReuniaoParticipanteUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ReuniaoParticipanteUpdateManyWithWhereWithoutUsuarioInput | ReuniaoParticipanteUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
  }

  export type ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput = {
    create?: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput> | ReuniaoCreateWithoutCriadoPorInput[] | ReuniaoUncheckedCreateWithoutCriadoPorInput[]
    connectOrCreate?: ReuniaoCreateOrConnectWithoutCriadoPorInput | ReuniaoCreateOrConnectWithoutCriadoPorInput[]
    upsert?: ReuniaoUpsertWithWhereUniqueWithoutCriadoPorInput | ReuniaoUpsertWithWhereUniqueWithoutCriadoPorInput[]
    createMany?: ReuniaoCreateManyCriadoPorInputEnvelope
    set?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    disconnect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    delete?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    connect?: ReuniaoWhereUniqueInput | ReuniaoWhereUniqueInput[]
    update?: ReuniaoUpdateWithWhereUniqueWithoutCriadoPorInput | ReuniaoUpdateWithWhereUniqueWithoutCriadoPorInput[]
    updateMany?: ReuniaoUpdateManyWithWhereWithoutCriadoPorInput | ReuniaoUpdateManyWithWhereWithoutCriadoPorInput[]
    deleteMany?: ReuniaoScalarWhereInput | ReuniaoScalarWhereInput[]
  }

  export type CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput = {
    create?: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
    connectOrCreate?: CodigoProfessorCreateOrConnectWithoutProfessorInput
    upsert?: CodigoProfessorUpsertWithoutProfessorInput
    disconnect?: CodigoProfessorWhereInput | boolean
    delete?: CodigoProfessorWhereInput | boolean
    connect?: CodigoProfessorWhereUniqueInput
    update?: XOR<XOR<CodigoProfessorUpdateToOneWithWhereWithoutProfessorInput, CodigoProfessorUpdateWithoutProfessorInput>, CodigoProfessorUncheckedUpdateWithoutProfessorInput>
  }

  export type FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput> | FeedbackCreateWithoutUsuarioInput[] | FeedbackUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUsuarioInput | FeedbackCreateOrConnectWithoutUsuarioInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUsuarioInput | FeedbackUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: FeedbackCreateManyUsuarioInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUsuarioInput | FeedbackUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUsuarioInput | FeedbackUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type TurmaCreateNestedOneWithoutAlunosInput = {
    create?: XOR<TurmaCreateWithoutAlunosInput, TurmaUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutAlunosInput
    connect?: TurmaWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutAlunosInput = {
    create?: XOR<UsuarioCreateWithoutAlunosInput, UsuarioUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAlunosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CursoCreateNestedOneWithoutAlunosInput = {
    create?: XOR<CursoCreateWithoutAlunosInput, CursoUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutAlunosInput
    connect?: CursoWhereUniqueInput
  }

  export type NotaCreateNestedManyWithoutAlunoInput = {
    create?: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput> | NotaCreateWithoutAlunoInput[] | NotaUncheckedCreateWithoutAlunoInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutAlunoInput | NotaCreateOrConnectWithoutAlunoInput[]
    createMany?: NotaCreateManyAlunoInputEnvelope
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
  }

  export type NotaUncheckedCreateNestedManyWithoutAlunoInput = {
    create?: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput> | NotaCreateWithoutAlunoInput[] | NotaUncheckedCreateWithoutAlunoInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutAlunoInput | NotaCreateOrConnectWithoutAlunoInput[]
    createMany?: NotaCreateManyAlunoInputEnvelope
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
  }

  export type TurmaUpdateOneRequiredWithoutAlunosNestedInput = {
    create?: XOR<TurmaCreateWithoutAlunosInput, TurmaUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutAlunosInput
    upsert?: TurmaUpsertWithoutAlunosInput
    connect?: TurmaWhereUniqueInput
    update?: XOR<XOR<TurmaUpdateToOneWithWhereWithoutAlunosInput, TurmaUpdateWithoutAlunosInput>, TurmaUncheckedUpdateWithoutAlunosInput>
  }

  export type UsuarioUpdateOneWithoutAlunosNestedInput = {
    create?: XOR<UsuarioCreateWithoutAlunosInput, UsuarioUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAlunosInput
    upsert?: UsuarioUpsertWithoutAlunosInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAlunosInput, UsuarioUpdateWithoutAlunosInput>, UsuarioUncheckedUpdateWithoutAlunosInput>
  }

  export type CursoUpdateOneRequiredWithoutAlunosNestedInput = {
    create?: XOR<CursoCreateWithoutAlunosInput, CursoUncheckedCreateWithoutAlunosInput>
    connectOrCreate?: CursoCreateOrConnectWithoutAlunosInput
    upsert?: CursoUpsertWithoutAlunosInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutAlunosInput, CursoUpdateWithoutAlunosInput>, CursoUncheckedUpdateWithoutAlunosInput>
  }

  export type NotaUpdateManyWithoutAlunoNestedInput = {
    create?: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput> | NotaCreateWithoutAlunoInput[] | NotaUncheckedCreateWithoutAlunoInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutAlunoInput | NotaCreateOrConnectWithoutAlunoInput[]
    upsert?: NotaUpsertWithWhereUniqueWithoutAlunoInput | NotaUpsertWithWhereUniqueWithoutAlunoInput[]
    createMany?: NotaCreateManyAlunoInputEnvelope
    set?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    disconnect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    delete?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    update?: NotaUpdateWithWhereUniqueWithoutAlunoInput | NotaUpdateWithWhereUniqueWithoutAlunoInput[]
    updateMany?: NotaUpdateManyWithWhereWithoutAlunoInput | NotaUpdateManyWithWhereWithoutAlunoInput[]
    deleteMany?: NotaScalarWhereInput | NotaScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NotaUncheckedUpdateManyWithoutAlunoNestedInput = {
    create?: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput> | NotaCreateWithoutAlunoInput[] | NotaUncheckedCreateWithoutAlunoInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutAlunoInput | NotaCreateOrConnectWithoutAlunoInput[]
    upsert?: NotaUpsertWithWhereUniqueWithoutAlunoInput | NotaUpsertWithWhereUniqueWithoutAlunoInput[]
    createMany?: NotaCreateManyAlunoInputEnvelope
    set?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    disconnect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    delete?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    update?: NotaUpdateWithWhereUniqueWithoutAlunoInput | NotaUpdateWithWhereUniqueWithoutAlunoInput[]
    updateMany?: NotaUpdateManyWithWhereWithoutAlunoInput | NotaUpdateManyWithWhereWithoutAlunoInput[]
    deleteMany?: NotaScalarWhereInput | NotaScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutTurmasInput = {
    create?: XOR<UsuarioCreateWithoutTurmasInput, UsuarioUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTurmasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CursoCreateNestedOneWithoutTurmasInput = {
    create?: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutTurmasInput
    connect?: CursoWhereUniqueInput
  }

  export type AlunoCreateNestedManyWithoutTurmaInput = {
    create?: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput> | AlunoCreateWithoutTurmaInput[] | AlunoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutTurmaInput | AlunoCreateOrConnectWithoutTurmaInput[]
    createMany?: AlunoCreateManyTurmaInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type DisciplinaCreateNestedManyWithoutTurmasInput = {
    create?: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput> | DisciplinaCreateWithoutTurmasInput[] | DisciplinaUncheckedCreateWithoutTurmasInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutTurmasInput | DisciplinaCreateOrConnectWithoutTurmasInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type AlunoUncheckedCreateNestedManyWithoutTurmaInput = {
    create?: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput> | AlunoCreateWithoutTurmaInput[] | AlunoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutTurmaInput | AlunoCreateOrConnectWithoutTurmaInput[]
    createMany?: AlunoCreateManyTurmaInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type DisciplinaUncheckedCreateNestedManyWithoutTurmasInput = {
    create?: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput> | DisciplinaCreateWithoutTurmasInput[] | DisciplinaUncheckedCreateWithoutTurmasInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutTurmasInput | DisciplinaCreateOrConnectWithoutTurmasInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type UsuarioUpdateOneWithoutTurmasNestedInput = {
    create?: XOR<UsuarioCreateWithoutTurmasInput, UsuarioUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTurmasInput
    upsert?: UsuarioUpsertWithoutTurmasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutTurmasInput, UsuarioUpdateWithoutTurmasInput>, UsuarioUncheckedUpdateWithoutTurmasInput>
  }

  export type CursoUpdateOneWithoutTurmasNestedInput = {
    create?: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutTurmasInput
    upsert?: CursoUpsertWithoutTurmasInput
    disconnect?: CursoWhereInput | boolean
    delete?: CursoWhereInput | boolean
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutTurmasInput, CursoUpdateWithoutTurmasInput>, CursoUncheckedUpdateWithoutTurmasInput>
  }

  export type AlunoUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput> | AlunoCreateWithoutTurmaInput[] | AlunoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutTurmaInput | AlunoCreateOrConnectWithoutTurmaInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutTurmaInput | AlunoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: AlunoCreateManyTurmaInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutTurmaInput | AlunoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutTurmaInput | AlunoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type DisciplinaUpdateManyWithoutTurmasNestedInput = {
    create?: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput> | DisciplinaCreateWithoutTurmasInput[] | DisciplinaUncheckedCreateWithoutTurmasInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutTurmasInput | DisciplinaCreateOrConnectWithoutTurmasInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutTurmasInput | DisciplinaUpsertWithWhereUniqueWithoutTurmasInput[]
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutTurmasInput | DisciplinaUpdateWithWhereUniqueWithoutTurmasInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutTurmasInput | DisciplinaUpdateManyWithWhereWithoutTurmasInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type AlunoUncheckedUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput> | AlunoCreateWithoutTurmaInput[] | AlunoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutTurmaInput | AlunoCreateOrConnectWithoutTurmaInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutTurmaInput | AlunoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: AlunoCreateManyTurmaInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutTurmaInput | AlunoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutTurmaInput | AlunoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type DisciplinaUncheckedUpdateManyWithoutTurmasNestedInput = {
    create?: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput> | DisciplinaCreateWithoutTurmasInput[] | DisciplinaUncheckedCreateWithoutTurmasInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutTurmasInput | DisciplinaCreateOrConnectWithoutTurmasInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutTurmasInput | DisciplinaUpsertWithWhereUniqueWithoutTurmasInput[]
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutTurmasInput | DisciplinaUpdateWithWhereUniqueWithoutTurmasInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutTurmasInput | DisciplinaUpdateManyWithWhereWithoutTurmasInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type DisciplinaCreateNestedManyWithoutCursoInput = {
    create?: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput> | DisciplinaCreateWithoutCursoInput[] | DisciplinaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutCursoInput | DisciplinaCreateOrConnectWithoutCursoInput[]
    createMany?: DisciplinaCreateManyCursoInputEnvelope
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type AlunoCreateNestedManyWithoutCursoInput = {
    create?: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput> | AlunoCreateWithoutCursoInput[] | AlunoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutCursoInput | AlunoCreateOrConnectWithoutCursoInput[]
    createMany?: AlunoCreateManyCursoInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type TurmaCreateNestedManyWithoutCursoInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type UsuarioCreateNestedManyWithoutCursosInput = {
    create?: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput> | UsuarioCreateWithoutCursosInput[] | UsuarioUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCursosInput | UsuarioCreateOrConnectWithoutCursosInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type DisciplinaUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput> | DisciplinaCreateWithoutCursoInput[] | DisciplinaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutCursoInput | DisciplinaCreateOrConnectWithoutCursoInput[]
    createMany?: DisciplinaCreateManyCursoInputEnvelope
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
  }

  export type AlunoUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput> | AlunoCreateWithoutCursoInput[] | AlunoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutCursoInput | AlunoCreateOrConnectWithoutCursoInput[]
    createMany?: AlunoCreateManyCursoInputEnvelope
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
  }

  export type TurmaUncheckedCreateNestedManyWithoutCursoInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutCursosInput = {
    create?: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput> | UsuarioCreateWithoutCursosInput[] | UsuarioUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCursosInput | UsuarioCreateOrConnectWithoutCursosInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type DisciplinaUpdateManyWithoutCursoNestedInput = {
    create?: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput> | DisciplinaCreateWithoutCursoInput[] | DisciplinaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutCursoInput | DisciplinaCreateOrConnectWithoutCursoInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutCursoInput | DisciplinaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: DisciplinaCreateManyCursoInputEnvelope
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutCursoInput | DisciplinaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutCursoInput | DisciplinaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type AlunoUpdateManyWithoutCursoNestedInput = {
    create?: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput> | AlunoCreateWithoutCursoInput[] | AlunoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutCursoInput | AlunoCreateOrConnectWithoutCursoInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutCursoInput | AlunoUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: AlunoCreateManyCursoInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutCursoInput | AlunoUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutCursoInput | AlunoUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type TurmaUpdateManyWithoutCursoNestedInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutCursoInput | TurmaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutCursoInput | TurmaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutCursoInput | TurmaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type UsuarioUpdateManyWithoutCursosNestedInput = {
    create?: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput> | UsuarioCreateWithoutCursosInput[] | UsuarioUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCursosInput | UsuarioCreateOrConnectWithoutCursosInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutCursosInput | UsuarioUpsertWithWhereUniqueWithoutCursosInput[]
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutCursosInput | UsuarioUpdateWithWhereUniqueWithoutCursosInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutCursosInput | UsuarioUpdateManyWithWhereWithoutCursosInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type DisciplinaUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput> | DisciplinaCreateWithoutCursoInput[] | DisciplinaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: DisciplinaCreateOrConnectWithoutCursoInput | DisciplinaCreateOrConnectWithoutCursoInput[]
    upsert?: DisciplinaUpsertWithWhereUniqueWithoutCursoInput | DisciplinaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: DisciplinaCreateManyCursoInputEnvelope
    set?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    disconnect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    delete?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    connect?: DisciplinaWhereUniqueInput | DisciplinaWhereUniqueInput[]
    update?: DisciplinaUpdateWithWhereUniqueWithoutCursoInput | DisciplinaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: DisciplinaUpdateManyWithWhereWithoutCursoInput | DisciplinaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
  }

  export type AlunoUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput> | AlunoCreateWithoutCursoInput[] | AlunoUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: AlunoCreateOrConnectWithoutCursoInput | AlunoCreateOrConnectWithoutCursoInput[]
    upsert?: AlunoUpsertWithWhereUniqueWithoutCursoInput | AlunoUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: AlunoCreateManyCursoInputEnvelope
    set?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    disconnect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    delete?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    connect?: AlunoWhereUniqueInput | AlunoWhereUniqueInput[]
    update?: AlunoUpdateWithWhereUniqueWithoutCursoInput | AlunoUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: AlunoUpdateManyWithWhereWithoutCursoInput | AlunoUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
  }

  export type TurmaUncheckedUpdateManyWithoutCursoNestedInput = {
    create?: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput> | TurmaCreateWithoutCursoInput[] | TurmaUncheckedCreateWithoutCursoInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutCursoInput | TurmaCreateOrConnectWithoutCursoInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutCursoInput | TurmaUpsertWithWhereUniqueWithoutCursoInput[]
    createMany?: TurmaCreateManyCursoInputEnvelope
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutCursoInput | TurmaUpdateWithWhereUniqueWithoutCursoInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutCursoInput | TurmaUpdateManyWithWhereWithoutCursoInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutCursosNestedInput = {
    create?: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput> | UsuarioCreateWithoutCursosInput[] | UsuarioUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCursosInput | UsuarioCreateOrConnectWithoutCursosInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutCursosInput | UsuarioUpsertWithWhereUniqueWithoutCursosInput[]
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutCursosInput | UsuarioUpdateWithWhereUniqueWithoutCursosInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutCursosInput | UsuarioUpdateManyWithWhereWithoutCursosInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type CursoCreateNestedOneWithoutDisciplinasInput = {
    create?: XOR<CursoCreateWithoutDisciplinasInput, CursoUncheckedCreateWithoutDisciplinasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutDisciplinasInput
    connect?: CursoWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutDisciplinasInput = {
    create?: XOR<UsuarioCreateWithoutDisciplinasInput, UsuarioUncheckedCreateWithoutDisciplinasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDisciplinasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type NotaCreateNestedManyWithoutDisciplinaInput = {
    create?: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput> | NotaCreateWithoutDisciplinaInput[] | NotaUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutDisciplinaInput | NotaCreateOrConnectWithoutDisciplinaInput[]
    createMany?: NotaCreateManyDisciplinaInputEnvelope
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
  }

  export type TurmaCreateNestedManyWithoutDisciplinasInput = {
    create?: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput> | TurmaCreateWithoutDisciplinasInput[] | TurmaUncheckedCreateWithoutDisciplinasInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutDisciplinasInput | TurmaCreateOrConnectWithoutDisciplinasInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type NotaUncheckedCreateNestedManyWithoutDisciplinaInput = {
    create?: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput> | NotaCreateWithoutDisciplinaInput[] | NotaUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutDisciplinaInput | NotaCreateOrConnectWithoutDisciplinaInput[]
    createMany?: NotaCreateManyDisciplinaInputEnvelope
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
  }

  export type TurmaUncheckedCreateNestedManyWithoutDisciplinasInput = {
    create?: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput> | TurmaCreateWithoutDisciplinasInput[] | TurmaUncheckedCreateWithoutDisciplinasInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutDisciplinasInput | TurmaCreateOrConnectWithoutDisciplinasInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
  }

  export type CursoUpdateOneRequiredWithoutDisciplinasNestedInput = {
    create?: XOR<CursoCreateWithoutDisciplinasInput, CursoUncheckedCreateWithoutDisciplinasInput>
    connectOrCreate?: CursoCreateOrConnectWithoutDisciplinasInput
    upsert?: CursoUpsertWithoutDisciplinasInput
    connect?: CursoWhereUniqueInput
    update?: XOR<XOR<CursoUpdateToOneWithWhereWithoutDisciplinasInput, CursoUpdateWithoutDisciplinasInput>, CursoUncheckedUpdateWithoutDisciplinasInput>
  }

  export type UsuarioUpdateOneWithoutDisciplinasNestedInput = {
    create?: XOR<UsuarioCreateWithoutDisciplinasInput, UsuarioUncheckedCreateWithoutDisciplinasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutDisciplinasInput
    upsert?: UsuarioUpsertWithoutDisciplinasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutDisciplinasInput, UsuarioUpdateWithoutDisciplinasInput>, UsuarioUncheckedUpdateWithoutDisciplinasInput>
  }

  export type NotaUpdateManyWithoutDisciplinaNestedInput = {
    create?: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput> | NotaCreateWithoutDisciplinaInput[] | NotaUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutDisciplinaInput | NotaCreateOrConnectWithoutDisciplinaInput[]
    upsert?: NotaUpsertWithWhereUniqueWithoutDisciplinaInput | NotaUpsertWithWhereUniqueWithoutDisciplinaInput[]
    createMany?: NotaCreateManyDisciplinaInputEnvelope
    set?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    disconnect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    delete?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    update?: NotaUpdateWithWhereUniqueWithoutDisciplinaInput | NotaUpdateWithWhereUniqueWithoutDisciplinaInput[]
    updateMany?: NotaUpdateManyWithWhereWithoutDisciplinaInput | NotaUpdateManyWithWhereWithoutDisciplinaInput[]
    deleteMany?: NotaScalarWhereInput | NotaScalarWhereInput[]
  }

  export type TurmaUpdateManyWithoutDisciplinasNestedInput = {
    create?: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput> | TurmaCreateWithoutDisciplinasInput[] | TurmaUncheckedCreateWithoutDisciplinasInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutDisciplinasInput | TurmaCreateOrConnectWithoutDisciplinasInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutDisciplinasInput | TurmaUpsertWithWhereUniqueWithoutDisciplinasInput[]
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutDisciplinasInput | TurmaUpdateWithWhereUniqueWithoutDisciplinasInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutDisciplinasInput | TurmaUpdateManyWithWhereWithoutDisciplinasInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type NotaUncheckedUpdateManyWithoutDisciplinaNestedInput = {
    create?: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput> | NotaCreateWithoutDisciplinaInput[] | NotaUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: NotaCreateOrConnectWithoutDisciplinaInput | NotaCreateOrConnectWithoutDisciplinaInput[]
    upsert?: NotaUpsertWithWhereUniqueWithoutDisciplinaInput | NotaUpsertWithWhereUniqueWithoutDisciplinaInput[]
    createMany?: NotaCreateManyDisciplinaInputEnvelope
    set?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    disconnect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    delete?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    connect?: NotaWhereUniqueInput | NotaWhereUniqueInput[]
    update?: NotaUpdateWithWhereUniqueWithoutDisciplinaInput | NotaUpdateWithWhereUniqueWithoutDisciplinaInput[]
    updateMany?: NotaUpdateManyWithWhereWithoutDisciplinaInput | NotaUpdateManyWithWhereWithoutDisciplinaInput[]
    deleteMany?: NotaScalarWhereInput | NotaScalarWhereInput[]
  }

  export type TurmaUncheckedUpdateManyWithoutDisciplinasNestedInput = {
    create?: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput> | TurmaCreateWithoutDisciplinasInput[] | TurmaUncheckedCreateWithoutDisciplinasInput[]
    connectOrCreate?: TurmaCreateOrConnectWithoutDisciplinasInput | TurmaCreateOrConnectWithoutDisciplinasInput[]
    upsert?: TurmaUpsertWithWhereUniqueWithoutDisciplinasInput | TurmaUpsertWithWhereUniqueWithoutDisciplinasInput[]
    set?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    disconnect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    delete?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    connect?: TurmaWhereUniqueInput | TurmaWhereUniqueInput[]
    update?: TurmaUpdateWithWhereUniqueWithoutDisciplinasInput | TurmaUpdateWithWhereUniqueWithoutDisciplinasInput[]
    updateMany?: TurmaUpdateManyWithWhereWithoutDisciplinasInput | TurmaUpdateManyWithWhereWithoutDisciplinasInput[]
    deleteMany?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
  }

  export type AlunoCreateNestedOneWithoutNotasInput = {
    create?: XOR<AlunoCreateWithoutNotasInput, AlunoUncheckedCreateWithoutNotasInput>
    connectOrCreate?: AlunoCreateOrConnectWithoutNotasInput
    connect?: AlunoWhereUniqueInput
  }

  export type DisciplinaCreateNestedOneWithoutNotasInput = {
    create?: XOR<DisciplinaCreateWithoutNotasInput, DisciplinaUncheckedCreateWithoutNotasInput>
    connectOrCreate?: DisciplinaCreateOrConnectWithoutNotasInput
    connect?: DisciplinaWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlunoUpdateOneRequiredWithoutNotasNestedInput = {
    create?: XOR<AlunoCreateWithoutNotasInput, AlunoUncheckedCreateWithoutNotasInput>
    connectOrCreate?: AlunoCreateOrConnectWithoutNotasInput
    upsert?: AlunoUpsertWithoutNotasInput
    connect?: AlunoWhereUniqueInput
    update?: XOR<XOR<AlunoUpdateToOneWithWhereWithoutNotasInput, AlunoUpdateWithoutNotasInput>, AlunoUncheckedUpdateWithoutNotasInput>
  }

  export type DisciplinaUpdateOneRequiredWithoutNotasNestedInput = {
    create?: XOR<DisciplinaCreateWithoutNotasInput, DisciplinaUncheckedCreateWithoutNotasInput>
    connectOrCreate?: DisciplinaCreateOrConnectWithoutNotasInput
    upsert?: DisciplinaUpsertWithoutNotasInput
    connect?: DisciplinaWhereUniqueInput
    update?: XOR<XOR<DisciplinaUpdateToOneWithWhereWithoutNotasInput, DisciplinaUpdateWithoutNotasInput>, DisciplinaUncheckedUpdateWithoutNotasInput>
  }

  export type UsuarioCreateNestedOneWithoutMensagensEnviadasInput = {
    create?: XOR<UsuarioCreateWithoutMensagensEnviadasInput, UsuarioUncheckedCreateWithoutMensagensEnviadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMensagensEnviadasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutMensagensRecebidasInput = {
    create?: XOR<UsuarioCreateWithoutMensagensRecebidasInput, UsuarioUncheckedCreateWithoutMensagensRecebidasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMensagensRecebidasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInput = {
    create?: XOR<UsuarioCreateWithoutMensagensEnviadasInput, UsuarioUncheckedCreateWithoutMensagensEnviadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMensagensEnviadasInput
    upsert?: UsuarioUpsertWithoutMensagensEnviadasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutMensagensEnviadasInput, UsuarioUpdateWithoutMensagensEnviadasInput>, UsuarioUncheckedUpdateWithoutMensagensEnviadasInput>
  }

  export type UsuarioUpdateOneRequiredWithoutMensagensRecebidasNestedInput = {
    create?: XOR<UsuarioCreateWithoutMensagensRecebidasInput, UsuarioUncheckedCreateWithoutMensagensRecebidasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMensagensRecebidasInput
    upsert?: UsuarioUpsertWithoutMensagensRecebidasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutMensagensRecebidasInput, UsuarioUpdateWithoutMensagensRecebidasInput>, UsuarioUncheckedUpdateWithoutMensagensRecebidasInput>
  }

  export type UsuarioCreateNestedOneWithoutReunioesAgendadasInput = {
    create?: XOR<UsuarioCreateWithoutReunioesAgendadasInput, UsuarioUncheckedCreateWithoutReunioesAgendadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReunioesAgendadasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ReuniaoParticipanteCreateNestedManyWithoutReuniaoInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput> | ReuniaoParticipanteCreateWithoutReuniaoInput[] | ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput | ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput[]
    createMany?: ReuniaoParticipanteCreateManyReuniaoInputEnvelope
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
  }

  export type ReuniaoParticipanteUncheckedCreateNestedManyWithoutReuniaoInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput> | ReuniaoParticipanteCreateWithoutReuniaoInput[] | ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput | ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput[]
    createMany?: ReuniaoParticipanteCreateManyReuniaoInputEnvelope
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
  }

  export type UsuarioUpdateOneWithoutReunioesAgendadasNestedInput = {
    create?: XOR<UsuarioCreateWithoutReunioesAgendadasInput, UsuarioUncheckedCreateWithoutReunioesAgendadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReunioesAgendadasInput
    upsert?: UsuarioUpsertWithoutReunioesAgendadasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutReunioesAgendadasInput, UsuarioUpdateWithoutReunioesAgendadasInput>, UsuarioUncheckedUpdateWithoutReunioesAgendadasInput>
  }

  export type ReuniaoParticipanteUpdateManyWithoutReuniaoNestedInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput> | ReuniaoParticipanteCreateWithoutReuniaoInput[] | ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput | ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput[]
    upsert?: ReuniaoParticipanteUpsertWithWhereUniqueWithoutReuniaoInput | ReuniaoParticipanteUpsertWithWhereUniqueWithoutReuniaoInput[]
    createMany?: ReuniaoParticipanteCreateManyReuniaoInputEnvelope
    set?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    disconnect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    delete?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    update?: ReuniaoParticipanteUpdateWithWhereUniqueWithoutReuniaoInput | ReuniaoParticipanteUpdateWithWhereUniqueWithoutReuniaoInput[]
    updateMany?: ReuniaoParticipanteUpdateManyWithWhereWithoutReuniaoInput | ReuniaoParticipanteUpdateManyWithWhereWithoutReuniaoInput[]
    deleteMany?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
  }

  export type ReuniaoParticipanteUncheckedUpdateManyWithoutReuniaoNestedInput = {
    create?: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput> | ReuniaoParticipanteCreateWithoutReuniaoInput[] | ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput[]
    connectOrCreate?: ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput | ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput[]
    upsert?: ReuniaoParticipanteUpsertWithWhereUniqueWithoutReuniaoInput | ReuniaoParticipanteUpsertWithWhereUniqueWithoutReuniaoInput[]
    createMany?: ReuniaoParticipanteCreateManyReuniaoInputEnvelope
    set?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    disconnect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    delete?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    connect?: ReuniaoParticipanteWhereUniqueInput | ReuniaoParticipanteWhereUniqueInput[]
    update?: ReuniaoParticipanteUpdateWithWhereUniqueWithoutReuniaoInput | ReuniaoParticipanteUpdateWithWhereUniqueWithoutReuniaoInput[]
    updateMany?: ReuniaoParticipanteUpdateManyWithWhereWithoutReuniaoInput | ReuniaoParticipanteUpdateManyWithWhereWithoutReuniaoInput[]
    deleteMany?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
  }

  export type ReuniaoCreateNestedOneWithoutParticipantesInput = {
    create?: XOR<ReuniaoCreateWithoutParticipantesInput, ReuniaoUncheckedCreateWithoutParticipantesInput>
    connectOrCreate?: ReuniaoCreateOrConnectWithoutParticipantesInput
    connect?: ReuniaoWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutReunioesInput = {
    create?: XOR<UsuarioCreateWithoutReunioesInput, UsuarioUncheckedCreateWithoutReunioesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReunioesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ReuniaoUpdateOneRequiredWithoutParticipantesNestedInput = {
    create?: XOR<ReuniaoCreateWithoutParticipantesInput, ReuniaoUncheckedCreateWithoutParticipantesInput>
    connectOrCreate?: ReuniaoCreateOrConnectWithoutParticipantesInput
    upsert?: ReuniaoUpsertWithoutParticipantesInput
    connect?: ReuniaoWhereUniqueInput
    update?: XOR<XOR<ReuniaoUpdateToOneWithWhereWithoutParticipantesInput, ReuniaoUpdateWithoutParticipantesInput>, ReuniaoUncheckedUpdateWithoutParticipantesInput>
  }

  export type UsuarioUpdateOneRequiredWithoutReunioesNestedInput = {
    create?: XOR<UsuarioCreateWithoutReunioesInput, UsuarioUncheckedCreateWithoutReunioesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReunioesInput
    upsert?: UsuarioUpsertWithoutReunioesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutReunioesInput, UsuarioUpdateWithoutReunioesInput>, UsuarioUncheckedUpdateWithoutReunioesInput>
  }

  export type UsuarioCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UsuarioCreateWithoutFeedbacksInput, UsuarioUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFeedbacksInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneWithoutFeedbacksNestedInput = {
    create?: XOR<UsuarioCreateWithoutFeedbacksInput, UsuarioUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFeedbacksInput
    upsert?: UsuarioUpsertWithoutFeedbacksInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutFeedbacksInput, UsuarioUpdateWithoutFeedbacksInput>, UsuarioUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UsuarioCreateNestedOneWithoutCodigoProfessorInput = {
    create?: XOR<UsuarioCreateWithoutCodigoProfessorInput, UsuarioUncheckedCreateWithoutCodigoProfessorInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCodigoProfessorInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneWithoutCodigoProfessorNestedInput = {
    create?: XOR<UsuarioCreateWithoutCodigoProfessorInput, UsuarioUncheckedCreateWithoutCodigoProfessorInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCodigoProfessorInput
    upsert?: UsuarioUpsertWithoutCodigoProfessorInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCodigoProfessorInput, UsuarioUpdateWithoutCodigoProfessorInput>, UsuarioUncheckedUpdateWithoutCodigoProfessorInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AlunoCreateWithoutEncarregadoInput = {
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turma: TurmaCreateNestedOneWithoutAlunosInput
    curso: CursoCreateNestedOneWithoutAlunosInput
    notas?: NotaCreateNestedManyWithoutAlunoInput
  }

  export type AlunoUncheckedCreateWithoutEncarregadoInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutAlunoInput
  }

  export type AlunoCreateOrConnectWithoutEncarregadoInput = {
    where: AlunoWhereUniqueInput
    create: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput>
  }

  export type AlunoCreateManyEncarregadoInputEnvelope = {
    data: AlunoCreateManyEncarregadoInput | AlunoCreateManyEncarregadoInput[]
  }

  export type TurmaCreateWithoutProfessorInput = {
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    curso?: CursoCreateNestedOneWithoutTurmasInput
    alunos?: AlunoCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaCreateNestedManyWithoutTurmasInput
  }

  export type TurmaUncheckedCreateWithoutProfessorInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutTurmasInput
  }

  export type TurmaCreateOrConnectWithoutProfessorInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput>
  }

  export type TurmaCreateManyProfessorInputEnvelope = {
    data: TurmaCreateManyProfessorInput | TurmaCreateManyProfessorInput[]
  }

  export type DisciplinaCreateWithoutProfessorInput = {
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    curso: CursoCreateNestedOneWithoutDisciplinasInput
    notas?: NotaCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaUncheckedCreateWithoutProfessorInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaCreateOrConnectWithoutProfessorInput = {
    where: DisciplinaWhereUniqueInput
    create: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput>
  }

  export type DisciplinaCreateManyProfessorInputEnvelope = {
    data: DisciplinaCreateManyProfessorInput | DisciplinaCreateManyProfessorInput[]
  }

  export type CursoCreateWithoutProfessoresInput = {
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaCreateNestedManyWithoutCursoInput
    alunos?: AlunoCreateNestedManyWithoutCursoInput
    turmas?: TurmaCreateNestedManyWithoutCursoInput
  }

  export type CursoUncheckedCreateWithoutProfessoresInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutCursoInput
    alunos?: AlunoUncheckedCreateNestedManyWithoutCursoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
  }

  export type CursoCreateOrConnectWithoutProfessoresInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput>
  }

  export type MensagemCreateWithoutRemetenteInput = {
    conteudo: string
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
    destinatario: UsuarioCreateNestedOneWithoutMensagensRecebidasInput
  }

  export type MensagemUncheckedCreateWithoutRemetenteInput = {
    id?: number
    conteudo: string
    destinatarioId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type MensagemCreateOrConnectWithoutRemetenteInput = {
    where: MensagemWhereUniqueInput
    create: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput>
  }

  export type MensagemCreateManyRemetenteInputEnvelope = {
    data: MensagemCreateManyRemetenteInput | MensagemCreateManyRemetenteInput[]
  }

  export type MensagemCreateWithoutDestinatarioInput = {
    conteudo: string
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
    remetente: UsuarioCreateNestedOneWithoutMensagensEnviadasInput
  }

  export type MensagemUncheckedCreateWithoutDestinatarioInput = {
    id?: number
    conteudo: string
    remetenteId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type MensagemCreateOrConnectWithoutDestinatarioInput = {
    where: MensagemWhereUniqueInput
    create: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput>
  }

  export type MensagemCreateManyDestinatarioInputEnvelope = {
    data: MensagemCreateManyDestinatarioInput | MensagemCreateManyDestinatarioInput[]
  }

  export type ReuniaoParticipanteCreateWithoutUsuarioInput = {
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
    reuniao: ReuniaoCreateNestedOneWithoutParticipantesInput
  }

  export type ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput = {
    id?: number
    reuniaoId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoParticipanteCreateOrConnectWithoutUsuarioInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    create: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput>
  }

  export type ReuniaoParticipanteCreateManyUsuarioInputEnvelope = {
    data: ReuniaoParticipanteCreateManyUsuarioInput | ReuniaoParticipanteCreateManyUsuarioInput[]
  }

  export type ReuniaoCreateWithoutCriadoPorInput = {
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    participantes?: ReuniaoParticipanteCreateNestedManyWithoutReuniaoInput
  }

  export type ReuniaoUncheckedCreateWithoutCriadoPorInput = {
    id?: number
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    participantes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutReuniaoInput
  }

  export type ReuniaoCreateOrConnectWithoutCriadoPorInput = {
    where: ReuniaoWhereUniqueInput
    create: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput>
  }

  export type ReuniaoCreateManyCriadoPorInputEnvelope = {
    data: ReuniaoCreateManyCriadoPorInput | ReuniaoCreateManyCriadoPorInput[]
  }

  export type CodigoProfessorCreateWithoutProfessorInput = {
    codigo: string
    usado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CodigoProfessorUncheckedCreateWithoutProfessorInput = {
    id?: number
    codigo: string
    usado?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CodigoProfessorCreateOrConnectWithoutProfessorInput = {
    where: CodigoProfessorWhereUniqueInput
    create: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
  }

  export type FeedbackCreateWithoutUsuarioInput = {
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FeedbackUncheckedCreateWithoutUsuarioInput = {
    id?: number
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutUsuarioInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput>
  }

  export type FeedbackCreateManyUsuarioInputEnvelope = {
    data: FeedbackCreateManyUsuarioInput | FeedbackCreateManyUsuarioInput[]
  }

  export type AlunoUpsertWithWhereUniqueWithoutEncarregadoInput = {
    where: AlunoWhereUniqueInput
    update: XOR<AlunoUpdateWithoutEncarregadoInput, AlunoUncheckedUpdateWithoutEncarregadoInput>
    create: XOR<AlunoCreateWithoutEncarregadoInput, AlunoUncheckedCreateWithoutEncarregadoInput>
  }

  export type AlunoUpdateWithWhereUniqueWithoutEncarregadoInput = {
    where: AlunoWhereUniqueInput
    data: XOR<AlunoUpdateWithoutEncarregadoInput, AlunoUncheckedUpdateWithoutEncarregadoInput>
  }

  export type AlunoUpdateManyWithWhereWithoutEncarregadoInput = {
    where: AlunoScalarWhereInput
    data: XOR<AlunoUpdateManyMutationInput, AlunoUncheckedUpdateManyWithoutEncarregadoInput>
  }

  export type AlunoScalarWhereInput = {
    AND?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
    OR?: AlunoScalarWhereInput[]
    NOT?: AlunoScalarWhereInput | AlunoScalarWhereInput[]
    id?: IntFilter<"Aluno"> | number
    nome?: StringFilter<"Aluno"> | string
    matricula?: StringFilter<"Aluno"> | string
    telefone?: StringFilter<"Aluno"> | string
    email?: StringNullableFilter<"Aluno"> | string | null
    imagem?: StringNullableFilter<"Aluno"> | string | null
    classe?: StringFilter<"Aluno"> | string
    dataNascimento?: DateTimeNullableFilter<"Aluno"> | Date | string | null
    endereco?: StringNullableFilter<"Aluno"> | string | null
    turmaId?: IntFilter<"Aluno"> | number
    encarregadoId?: IntNullableFilter<"Aluno"> | number | null
    cursoId?: IntFilter<"Aluno"> | number
    criadoEm?: DateTimeFilter<"Aluno"> | Date | string
    atualizadoEm?: DateTimeFilter<"Aluno"> | Date | string
  }

  export type TurmaUpsertWithWhereUniqueWithoutProfessorInput = {
    where: TurmaWhereUniqueInput
    update: XOR<TurmaUpdateWithoutProfessorInput, TurmaUncheckedUpdateWithoutProfessorInput>
    create: XOR<TurmaCreateWithoutProfessorInput, TurmaUncheckedCreateWithoutProfessorInput>
  }

  export type TurmaUpdateWithWhereUniqueWithoutProfessorInput = {
    where: TurmaWhereUniqueInput
    data: XOR<TurmaUpdateWithoutProfessorInput, TurmaUncheckedUpdateWithoutProfessorInput>
  }

  export type TurmaUpdateManyWithWhereWithoutProfessorInput = {
    where: TurmaScalarWhereInput
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyWithoutProfessorInput>
  }

  export type TurmaScalarWhereInput = {
    AND?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
    OR?: TurmaScalarWhereInput[]
    NOT?: TurmaScalarWhereInput | TurmaScalarWhereInput[]
    id?: IntFilter<"Turma"> | number
    nome?: StringFilter<"Turma"> | string
    ano?: IntFilter<"Turma"> | number
    semestre?: IntNullableFilter<"Turma"> | number | null
    capacidade?: IntNullableFilter<"Turma"> | number | null
    turno?: StringNullableFilter<"Turma"> | string | null
    professorId?: IntNullableFilter<"Turma"> | number | null
    cursoId?: IntNullableFilter<"Turma"> | number | null
    criadoEm?: DateTimeFilter<"Turma"> | Date | string
    atualizadoEm?: DateTimeFilter<"Turma"> | Date | string
  }

  export type DisciplinaUpsertWithWhereUniqueWithoutProfessorInput = {
    where: DisciplinaWhereUniqueInput
    update: XOR<DisciplinaUpdateWithoutProfessorInput, DisciplinaUncheckedUpdateWithoutProfessorInput>
    create: XOR<DisciplinaCreateWithoutProfessorInput, DisciplinaUncheckedCreateWithoutProfessorInput>
  }

  export type DisciplinaUpdateWithWhereUniqueWithoutProfessorInput = {
    where: DisciplinaWhereUniqueInput
    data: XOR<DisciplinaUpdateWithoutProfessorInput, DisciplinaUncheckedUpdateWithoutProfessorInput>
  }

  export type DisciplinaUpdateManyWithWhereWithoutProfessorInput = {
    where: DisciplinaScalarWhereInput
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyWithoutProfessorInput>
  }

  export type DisciplinaScalarWhereInput = {
    AND?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
    OR?: DisciplinaScalarWhereInput[]
    NOT?: DisciplinaScalarWhereInput | DisciplinaScalarWhereInput[]
    id?: IntFilter<"Disciplina"> | number
    nome?: StringFilter<"Disciplina"> | string
    codigo?: StringNullableFilter<"Disciplina"> | string | null
    descricao?: StringFilter<"Disciplina"> | string
    cargaHoraria?: IntNullableFilter<"Disciplina"> | number | null
    semestre?: IntNullableFilter<"Disciplina"> | number | null
    cursoId?: IntFilter<"Disciplina"> | number
    professorId?: IntNullableFilter<"Disciplina"> | number | null
    criadoEm?: DateTimeFilter<"Disciplina"> | Date | string
    atualizadoEm?: DateTimeFilter<"Disciplina"> | Date | string
  }

  export type CursoUpsertWithWhereUniqueWithoutProfessoresInput = {
    where: CursoWhereUniqueInput
    update: XOR<CursoUpdateWithoutProfessoresInput, CursoUncheckedUpdateWithoutProfessoresInput>
    create: XOR<CursoCreateWithoutProfessoresInput, CursoUncheckedCreateWithoutProfessoresInput>
  }

  export type CursoUpdateWithWhereUniqueWithoutProfessoresInput = {
    where: CursoWhereUniqueInput
    data: XOR<CursoUpdateWithoutProfessoresInput, CursoUncheckedUpdateWithoutProfessoresInput>
  }

  export type CursoUpdateManyWithWhereWithoutProfessoresInput = {
    where: CursoScalarWhereInput
    data: XOR<CursoUpdateManyMutationInput, CursoUncheckedUpdateManyWithoutProfessoresInput>
  }

  export type CursoScalarWhereInput = {
    AND?: CursoScalarWhereInput | CursoScalarWhereInput[]
    OR?: CursoScalarWhereInput[]
    NOT?: CursoScalarWhereInput | CursoScalarWhereInput[]
    id?: IntFilter<"Curso"> | number
    nome?: StringFilter<"Curso"> | string
    descricao?: StringFilter<"Curso"> | string
    cargaHoraria?: IntNullableFilter<"Curso"> | number | null
    duracaoMeses?: IntNullableFilter<"Curso"> | number | null
    nivel?: StringNullableFilter<"Curso"> | string | null
    criadoEm?: DateTimeFilter<"Curso"> | Date | string
    atualizadoEm?: DateTimeFilter<"Curso"> | Date | string
  }

  export type MensagemUpsertWithWhereUniqueWithoutRemetenteInput = {
    where: MensagemWhereUniqueInput
    update: XOR<MensagemUpdateWithoutRemetenteInput, MensagemUncheckedUpdateWithoutRemetenteInput>
    create: XOR<MensagemCreateWithoutRemetenteInput, MensagemUncheckedCreateWithoutRemetenteInput>
  }

  export type MensagemUpdateWithWhereUniqueWithoutRemetenteInput = {
    where: MensagemWhereUniqueInput
    data: XOR<MensagemUpdateWithoutRemetenteInput, MensagemUncheckedUpdateWithoutRemetenteInput>
  }

  export type MensagemUpdateManyWithWhereWithoutRemetenteInput = {
    where: MensagemScalarWhereInput
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyWithoutRemetenteInput>
  }

  export type MensagemScalarWhereInput = {
    AND?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
    OR?: MensagemScalarWhereInput[]
    NOT?: MensagemScalarWhereInput | MensagemScalarWhereInput[]
    id?: IntFilter<"Mensagem"> | number
    conteudo?: StringFilter<"Mensagem"> | string
    remetenteId?: IntFilter<"Mensagem"> | number
    destinatarioId?: IntFilter<"Mensagem"> | number
    lida?: BoolFilter<"Mensagem"> | boolean
    lidaEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    editadoEm?: DateTimeNullableFilter<"Mensagem"> | Date | string | null
    criadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    atualizadoEm?: DateTimeFilter<"Mensagem"> | Date | string
    deletadoParaRemetente?: BoolFilter<"Mensagem"> | boolean
    deletadoParaDestinatario?: BoolFilter<"Mensagem"> | boolean
    arquivoUrl?: StringNullableFilter<"Mensagem"> | string | null
    arquivoNome?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTipo?: StringNullableFilter<"Mensagem"> | string | null
    arquivoTamanho?: IntNullableFilter<"Mensagem"> | number | null
  }

  export type MensagemUpsertWithWhereUniqueWithoutDestinatarioInput = {
    where: MensagemWhereUniqueInput
    update: XOR<MensagemUpdateWithoutDestinatarioInput, MensagemUncheckedUpdateWithoutDestinatarioInput>
    create: XOR<MensagemCreateWithoutDestinatarioInput, MensagemUncheckedCreateWithoutDestinatarioInput>
  }

  export type MensagemUpdateWithWhereUniqueWithoutDestinatarioInput = {
    where: MensagemWhereUniqueInput
    data: XOR<MensagemUpdateWithoutDestinatarioInput, MensagemUncheckedUpdateWithoutDestinatarioInput>
  }

  export type MensagemUpdateManyWithWhereWithoutDestinatarioInput = {
    where: MensagemScalarWhereInput
    data: XOR<MensagemUpdateManyMutationInput, MensagemUncheckedUpdateManyWithoutDestinatarioInput>
  }

  export type ReuniaoParticipanteUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    update: XOR<ReuniaoParticipanteUpdateWithoutUsuarioInput, ReuniaoParticipanteUncheckedUpdateWithoutUsuarioInput>
    create: XOR<ReuniaoParticipanteCreateWithoutUsuarioInput, ReuniaoParticipanteUncheckedCreateWithoutUsuarioInput>
  }

  export type ReuniaoParticipanteUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    data: XOR<ReuniaoParticipanteUpdateWithoutUsuarioInput, ReuniaoParticipanteUncheckedUpdateWithoutUsuarioInput>
  }

  export type ReuniaoParticipanteUpdateManyWithWhereWithoutUsuarioInput = {
    where: ReuniaoParticipanteScalarWhereInput
    data: XOR<ReuniaoParticipanteUpdateManyMutationInput, ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type ReuniaoParticipanteScalarWhereInput = {
    AND?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
    OR?: ReuniaoParticipanteScalarWhereInput[]
    NOT?: ReuniaoParticipanteScalarWhereInput | ReuniaoParticipanteScalarWhereInput[]
    id?: IntFilter<"ReuniaoParticipante"> | number
    reuniaoId?: IntFilter<"ReuniaoParticipante"> | number
    usuarioId?: IntFilter<"ReuniaoParticipante"> | number
    status?: StringFilter<"ReuniaoParticipante"> | string
    confirmadoEm?: DateTimeNullableFilter<"ReuniaoParticipante"> | Date | string | null
    criadoEm?: DateTimeFilter<"ReuniaoParticipante"> | Date | string
  }

  export type ReuniaoUpsertWithWhereUniqueWithoutCriadoPorInput = {
    where: ReuniaoWhereUniqueInput
    update: XOR<ReuniaoUpdateWithoutCriadoPorInput, ReuniaoUncheckedUpdateWithoutCriadoPorInput>
    create: XOR<ReuniaoCreateWithoutCriadoPorInput, ReuniaoUncheckedCreateWithoutCriadoPorInput>
  }

  export type ReuniaoUpdateWithWhereUniqueWithoutCriadoPorInput = {
    where: ReuniaoWhereUniqueInput
    data: XOR<ReuniaoUpdateWithoutCriadoPorInput, ReuniaoUncheckedUpdateWithoutCriadoPorInput>
  }

  export type ReuniaoUpdateManyWithWhereWithoutCriadoPorInput = {
    where: ReuniaoScalarWhereInput
    data: XOR<ReuniaoUpdateManyMutationInput, ReuniaoUncheckedUpdateManyWithoutCriadoPorInput>
  }

  export type ReuniaoScalarWhereInput = {
    AND?: ReuniaoScalarWhereInput | ReuniaoScalarWhereInput[]
    OR?: ReuniaoScalarWhereInput[]
    NOT?: ReuniaoScalarWhereInput | ReuniaoScalarWhereInput[]
    id?: IntFilter<"Reuniao"> | number
    titulo?: StringFilter<"Reuniao"> | string
    descricao?: StringNullableFilter<"Reuniao"> | string | null
    local?: StringFilter<"Reuniao"> | string
    linkMeeting?: StringNullableFilter<"Reuniao"> | string | null
    dataHora?: DateTimeNullableFilter<"Reuniao"> | Date | string | null
    criadoPorId?: IntNullableFilter<"Reuniao"> | number | null
    status?: StringFilter<"Reuniao"> | string
    criadoEm?: DateTimeFilter<"Reuniao"> | Date | string
    atualizadoEm?: DateTimeFilter<"Reuniao"> | Date | string
  }

  export type CodigoProfessorUpsertWithoutProfessorInput = {
    update: XOR<CodigoProfessorUpdateWithoutProfessorInput, CodigoProfessorUncheckedUpdateWithoutProfessorInput>
    create: XOR<CodigoProfessorCreateWithoutProfessorInput, CodigoProfessorUncheckedCreateWithoutProfessorInput>
    where?: CodigoProfessorWhereInput
  }

  export type CodigoProfessorUpdateToOneWithWhereWithoutProfessorInput = {
    where?: CodigoProfessorWhereInput
    data: XOR<CodigoProfessorUpdateWithoutProfessorInput, CodigoProfessorUncheckedUpdateWithoutProfessorInput>
  }

  export type CodigoProfessorUpdateWithoutProfessorInput = {
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodigoProfessorUncheckedUpdateWithoutProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigo?: StringFieldUpdateOperationsInput | string
    usado?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutUsuarioInput, FeedbackUncheckedUpdateWithoutUsuarioInput>
    create: XOR<FeedbackCreateWithoutUsuarioInput, FeedbackUncheckedCreateWithoutUsuarioInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutUsuarioInput, FeedbackUncheckedUpdateWithoutUsuarioInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutUsuarioInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: IntFilter<"Feedback"> | number
    nome?: StringFilter<"Feedback"> | string
    email?: StringFilter<"Feedback"> | string
    assunto?: StringFilter<"Feedback"> | string
    mensagem?: StringFilter<"Feedback"> | string
    avaliacao?: IntNullableFilter<"Feedback"> | number | null
    categoria?: StringFilter<"Feedback"> | string
    status?: StringFilter<"Feedback"> | string
    resposta?: StringNullableFilter<"Feedback"> | string | null
    respondidoEm?: DateTimeNullableFilter<"Feedback"> | Date | string | null
    usuarioId?: IntNullableFilter<"Feedback"> | number | null
    criadoEm?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type TurmaCreateWithoutAlunosInput = {
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutTurmasInput
    curso?: CursoCreateNestedOneWithoutTurmasInput
    disciplinas?: DisciplinaCreateNestedManyWithoutTurmasInput
  }

  export type TurmaUncheckedCreateWithoutAlunosInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutTurmasInput
  }

  export type TurmaCreateOrConnectWithoutAlunosInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutAlunosInput, TurmaUncheckedCreateWithoutAlunosInput>
  }

  export type UsuarioCreateWithoutAlunosInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutAlunosInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutAlunosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAlunosInput, UsuarioUncheckedCreateWithoutAlunosInput>
  }

  export type CursoCreateWithoutAlunosInput = {
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaCreateNestedManyWithoutCursoInput
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    professores?: UsuarioCreateNestedManyWithoutCursosInput
  }

  export type CursoUncheckedCreateWithoutAlunosInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutCursoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    professores?: UsuarioUncheckedCreateNestedManyWithoutCursosInput
  }

  export type CursoCreateOrConnectWithoutAlunosInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutAlunosInput, CursoUncheckedCreateWithoutAlunosInput>
  }

  export type NotaCreateWithoutAlunoInput = {
    valor: number
    tipo: string
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplina: DisciplinaCreateNestedOneWithoutNotasInput
  }

  export type NotaUncheckedCreateWithoutAlunoInput = {
    id?: number
    valor: number
    tipo: string
    disciplinaId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaCreateOrConnectWithoutAlunoInput = {
    where: NotaWhereUniqueInput
    create: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput>
  }

  export type NotaCreateManyAlunoInputEnvelope = {
    data: NotaCreateManyAlunoInput | NotaCreateManyAlunoInput[]
  }

  export type TurmaUpsertWithoutAlunosInput = {
    update: XOR<TurmaUpdateWithoutAlunosInput, TurmaUncheckedUpdateWithoutAlunosInput>
    create: XOR<TurmaCreateWithoutAlunosInput, TurmaUncheckedCreateWithoutAlunosInput>
    where?: TurmaWhereInput
  }

  export type TurmaUpdateToOneWithWhereWithoutAlunosInput = {
    where?: TurmaWhereInput
    data: XOR<TurmaUpdateWithoutAlunosInput, TurmaUncheckedUpdateWithoutAlunosInput>
  }

  export type TurmaUpdateWithoutAlunosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutTurmasNestedInput
    curso?: CursoUpdateOneWithoutTurmasNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateWithoutAlunosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutTurmasNestedInput
  }

  export type UsuarioUpsertWithoutAlunosInput = {
    update: XOR<UsuarioUpdateWithoutAlunosInput, UsuarioUncheckedUpdateWithoutAlunosInput>
    create: XOR<UsuarioCreateWithoutAlunosInput, UsuarioUncheckedCreateWithoutAlunosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAlunosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAlunosInput, UsuarioUncheckedUpdateWithoutAlunosInput>
  }

  export type UsuarioUpdateWithoutAlunosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutAlunosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CursoUpsertWithoutAlunosInput = {
    update: XOR<CursoUpdateWithoutAlunosInput, CursoUncheckedUpdateWithoutAlunosInput>
    create: XOR<CursoCreateWithoutAlunosInput, CursoUncheckedCreateWithoutAlunosInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutAlunosInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutAlunosInput, CursoUncheckedUpdateWithoutAlunosInput>
  }

  export type CursoUpdateWithoutAlunosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUpdateManyWithoutCursosNestedInput
  }

  export type CursoUncheckedUpdateWithoutAlunosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUncheckedUpdateManyWithoutCursosNestedInput
  }

  export type NotaUpsertWithWhereUniqueWithoutAlunoInput = {
    where: NotaWhereUniqueInput
    update: XOR<NotaUpdateWithoutAlunoInput, NotaUncheckedUpdateWithoutAlunoInput>
    create: XOR<NotaCreateWithoutAlunoInput, NotaUncheckedCreateWithoutAlunoInput>
  }

  export type NotaUpdateWithWhereUniqueWithoutAlunoInput = {
    where: NotaWhereUniqueInput
    data: XOR<NotaUpdateWithoutAlunoInput, NotaUncheckedUpdateWithoutAlunoInput>
  }

  export type NotaUpdateManyWithWhereWithoutAlunoInput = {
    where: NotaScalarWhereInput
    data: XOR<NotaUpdateManyMutationInput, NotaUncheckedUpdateManyWithoutAlunoInput>
  }

  export type NotaScalarWhereInput = {
    AND?: NotaScalarWhereInput | NotaScalarWhereInput[]
    OR?: NotaScalarWhereInput[]
    NOT?: NotaScalarWhereInput | NotaScalarWhereInput[]
    id?: IntFilter<"Nota"> | number
    valor?: FloatFilter<"Nota"> | number
    tipo?: StringFilter<"Nota"> | string
    alunoId?: IntFilter<"Nota"> | number
    disciplinaId?: IntFilter<"Nota"> | number
    semestre?: IntFilter<"Nota"> | number
    observacao?: StringNullableFilter<"Nota"> | string | null
    criadoEm?: DateTimeFilter<"Nota"> | Date | string
    atualizadoEm?: DateTimeFilter<"Nota"> | Date | string
  }

  export type UsuarioCreateWithoutTurmasInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutTurmasInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutTurmasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutTurmasInput, UsuarioUncheckedCreateWithoutTurmasInput>
  }

  export type CursoCreateWithoutTurmasInput = {
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaCreateNestedManyWithoutCursoInput
    alunos?: AlunoCreateNestedManyWithoutCursoInput
    professores?: UsuarioCreateNestedManyWithoutCursosInput
  }

  export type CursoUncheckedCreateWithoutTurmasInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutCursoInput
    alunos?: AlunoUncheckedCreateNestedManyWithoutCursoInput
    professores?: UsuarioUncheckedCreateNestedManyWithoutCursosInput
  }

  export type CursoCreateOrConnectWithoutTurmasInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
  }

  export type AlunoCreateWithoutTurmaInput = {
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    encarregado?: UsuarioCreateNestedOneWithoutAlunosInput
    curso: CursoCreateNestedOneWithoutAlunosInput
    notas?: NotaCreateNestedManyWithoutAlunoInput
  }

  export type AlunoUncheckedCreateWithoutTurmaInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    encarregadoId?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutAlunoInput
  }

  export type AlunoCreateOrConnectWithoutTurmaInput = {
    where: AlunoWhereUniqueInput
    create: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput>
  }

  export type AlunoCreateManyTurmaInputEnvelope = {
    data: AlunoCreateManyTurmaInput | AlunoCreateManyTurmaInput[]
  }

  export type DisciplinaCreateWithoutTurmasInput = {
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    curso: CursoCreateNestedOneWithoutDisciplinasInput
    professor?: UsuarioCreateNestedOneWithoutDisciplinasInput
    notas?: NotaCreateNestedManyWithoutDisciplinaInput
  }

  export type DisciplinaUncheckedCreateWithoutTurmasInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutDisciplinaInput
  }

  export type DisciplinaCreateOrConnectWithoutTurmasInput = {
    where: DisciplinaWhereUniqueInput
    create: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput>
  }

  export type UsuarioUpsertWithoutTurmasInput = {
    update: XOR<UsuarioUpdateWithoutTurmasInput, UsuarioUncheckedUpdateWithoutTurmasInput>
    create: XOR<UsuarioCreateWithoutTurmasInput, UsuarioUncheckedCreateWithoutTurmasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutTurmasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutTurmasInput, UsuarioUncheckedUpdateWithoutTurmasInput>
  }

  export type UsuarioUpdateWithoutTurmasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutTurmasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CursoUpsertWithoutTurmasInput = {
    update: XOR<CursoUpdateWithoutTurmasInput, CursoUncheckedUpdateWithoutTurmasInput>
    create: XOR<CursoCreateWithoutTurmasInput, CursoUncheckedCreateWithoutTurmasInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutTurmasInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutTurmasInput, CursoUncheckedUpdateWithoutTurmasInput>
  }

  export type CursoUpdateWithoutTurmasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUpdateManyWithoutCursosNestedInput
  }

  export type CursoUncheckedUpdateWithoutTurmasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUncheckedUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUncheckedUpdateManyWithoutCursosNestedInput
  }

  export type AlunoUpsertWithWhereUniqueWithoutTurmaInput = {
    where: AlunoWhereUniqueInput
    update: XOR<AlunoUpdateWithoutTurmaInput, AlunoUncheckedUpdateWithoutTurmaInput>
    create: XOR<AlunoCreateWithoutTurmaInput, AlunoUncheckedCreateWithoutTurmaInput>
  }

  export type AlunoUpdateWithWhereUniqueWithoutTurmaInput = {
    where: AlunoWhereUniqueInput
    data: XOR<AlunoUpdateWithoutTurmaInput, AlunoUncheckedUpdateWithoutTurmaInput>
  }

  export type AlunoUpdateManyWithWhereWithoutTurmaInput = {
    where: AlunoScalarWhereInput
    data: XOR<AlunoUpdateManyMutationInput, AlunoUncheckedUpdateManyWithoutTurmaInput>
  }

  export type DisciplinaUpsertWithWhereUniqueWithoutTurmasInput = {
    where: DisciplinaWhereUniqueInput
    update: XOR<DisciplinaUpdateWithoutTurmasInput, DisciplinaUncheckedUpdateWithoutTurmasInput>
    create: XOR<DisciplinaCreateWithoutTurmasInput, DisciplinaUncheckedCreateWithoutTurmasInput>
  }

  export type DisciplinaUpdateWithWhereUniqueWithoutTurmasInput = {
    where: DisciplinaWhereUniqueInput
    data: XOR<DisciplinaUpdateWithoutTurmasInput, DisciplinaUncheckedUpdateWithoutTurmasInput>
  }

  export type DisciplinaUpdateManyWithWhereWithoutTurmasInput = {
    where: DisciplinaScalarWhereInput
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyWithoutTurmasInput>
  }

  export type DisciplinaCreateWithoutCursoInput = {
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutDisciplinasInput
    notas?: NotaCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaUncheckedCreateWithoutCursoInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutDisciplinaInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaCreateOrConnectWithoutCursoInput = {
    where: DisciplinaWhereUniqueInput
    create: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput>
  }

  export type DisciplinaCreateManyCursoInputEnvelope = {
    data: DisciplinaCreateManyCursoInput | DisciplinaCreateManyCursoInput[]
  }

  export type AlunoCreateWithoutCursoInput = {
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turma: TurmaCreateNestedOneWithoutAlunosInput
    encarregado?: UsuarioCreateNestedOneWithoutAlunosInput
    notas?: NotaCreateNestedManyWithoutAlunoInput
  }

  export type AlunoUncheckedCreateWithoutCursoInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    encarregadoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    notas?: NotaUncheckedCreateNestedManyWithoutAlunoInput
  }

  export type AlunoCreateOrConnectWithoutCursoInput = {
    where: AlunoWhereUniqueInput
    create: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput>
  }

  export type AlunoCreateManyCursoInputEnvelope = {
    data: AlunoCreateManyCursoInput | AlunoCreateManyCursoInput[]
  }

  export type TurmaCreateWithoutCursoInput = {
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutTurmasInput
    alunos?: AlunoCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaCreateNestedManyWithoutTurmasInput
  }

  export type TurmaUncheckedCreateWithoutCursoInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutTurmaInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutTurmasInput
  }

  export type TurmaCreateOrConnectWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput>
  }

  export type TurmaCreateManyCursoInputEnvelope = {
    data: TurmaCreateManyCursoInput | TurmaCreateManyCursoInput[]
  }

  export type UsuarioCreateWithoutCursosInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCursosInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCursosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput>
  }

  export type DisciplinaUpsertWithWhereUniqueWithoutCursoInput = {
    where: DisciplinaWhereUniqueInput
    update: XOR<DisciplinaUpdateWithoutCursoInput, DisciplinaUncheckedUpdateWithoutCursoInput>
    create: XOR<DisciplinaCreateWithoutCursoInput, DisciplinaUncheckedCreateWithoutCursoInput>
  }

  export type DisciplinaUpdateWithWhereUniqueWithoutCursoInput = {
    where: DisciplinaWhereUniqueInput
    data: XOR<DisciplinaUpdateWithoutCursoInput, DisciplinaUncheckedUpdateWithoutCursoInput>
  }

  export type DisciplinaUpdateManyWithWhereWithoutCursoInput = {
    where: DisciplinaScalarWhereInput
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyWithoutCursoInput>
  }

  export type AlunoUpsertWithWhereUniqueWithoutCursoInput = {
    where: AlunoWhereUniqueInput
    update: XOR<AlunoUpdateWithoutCursoInput, AlunoUncheckedUpdateWithoutCursoInput>
    create: XOR<AlunoCreateWithoutCursoInput, AlunoUncheckedCreateWithoutCursoInput>
  }

  export type AlunoUpdateWithWhereUniqueWithoutCursoInput = {
    where: AlunoWhereUniqueInput
    data: XOR<AlunoUpdateWithoutCursoInput, AlunoUncheckedUpdateWithoutCursoInput>
  }

  export type AlunoUpdateManyWithWhereWithoutCursoInput = {
    where: AlunoScalarWhereInput
    data: XOR<AlunoUpdateManyMutationInput, AlunoUncheckedUpdateManyWithoutCursoInput>
  }

  export type TurmaUpsertWithWhereUniqueWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    update: XOR<TurmaUpdateWithoutCursoInput, TurmaUncheckedUpdateWithoutCursoInput>
    create: XOR<TurmaCreateWithoutCursoInput, TurmaUncheckedCreateWithoutCursoInput>
  }

  export type TurmaUpdateWithWhereUniqueWithoutCursoInput = {
    where: TurmaWhereUniqueInput
    data: XOR<TurmaUpdateWithoutCursoInput, TurmaUncheckedUpdateWithoutCursoInput>
  }

  export type TurmaUpdateManyWithWhereWithoutCursoInput = {
    where: TurmaScalarWhereInput
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyWithoutCursoInput>
  }

  export type UsuarioUpsertWithWhereUniqueWithoutCursosInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutCursosInput, UsuarioUncheckedUpdateWithoutCursosInput>
    create: XOR<UsuarioCreateWithoutCursosInput, UsuarioUncheckedCreateWithoutCursosInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutCursosInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutCursosInput, UsuarioUncheckedUpdateWithoutCursosInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutCursosInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutCursosInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    telefone?: StringFilter<"Usuario"> | string
    perfil?: StringFilter<"Usuario"> | string
    imagem?: StringNullableFilter<"Usuario"> | string | null
    relacaoEducando?: StringNullableFilter<"Usuario"> | string | null
    codigoVerificacao?: StringNullableFilter<"Usuario"> | string | null
    ultimoLogin?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    ativo?: BoolFilter<"Usuario"> | boolean
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type CursoCreateWithoutDisciplinasInput = {
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutCursoInput
    turmas?: TurmaCreateNestedManyWithoutCursoInput
    professores?: UsuarioCreateNestedManyWithoutCursosInput
  }

  export type CursoUncheckedCreateWithoutDisciplinasInput = {
    id?: number
    nome: string
    descricao: string
    cargaHoraria?: number | null
    duracaoMeses?: number | null
    nivel?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutCursoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutCursoInput
    professores?: UsuarioUncheckedCreateNestedManyWithoutCursosInput
  }

  export type CursoCreateOrConnectWithoutDisciplinasInput = {
    where: CursoWhereUniqueInput
    create: XOR<CursoCreateWithoutDisciplinasInput, CursoUncheckedCreateWithoutDisciplinasInput>
  }

  export type UsuarioCreateWithoutDisciplinasInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutDisciplinasInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutDisciplinasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutDisciplinasInput, UsuarioUncheckedCreateWithoutDisciplinasInput>
  }

  export type NotaCreateWithoutDisciplinaInput = {
    valor: number
    tipo: string
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    aluno: AlunoCreateNestedOneWithoutNotasInput
  }

  export type NotaUncheckedCreateWithoutDisciplinaInput = {
    id?: number
    valor: number
    tipo: string
    alunoId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaCreateOrConnectWithoutDisciplinaInput = {
    where: NotaWhereUniqueInput
    create: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput>
  }

  export type NotaCreateManyDisciplinaInputEnvelope = {
    data: NotaCreateManyDisciplinaInput | NotaCreateManyDisciplinaInput[]
  }

  export type TurmaCreateWithoutDisciplinasInput = {
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    professor?: UsuarioCreateNestedOneWithoutTurmasInput
    curso?: CursoCreateNestedOneWithoutTurmasInput
    alunos?: AlunoCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUncheckedCreateWithoutDisciplinasInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutTurmaInput
  }

  export type TurmaCreateOrConnectWithoutDisciplinasInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput>
  }

  export type CursoUpsertWithoutDisciplinasInput = {
    update: XOR<CursoUpdateWithoutDisciplinasInput, CursoUncheckedUpdateWithoutDisciplinasInput>
    create: XOR<CursoCreateWithoutDisciplinasInput, CursoUncheckedCreateWithoutDisciplinasInput>
    where?: CursoWhereInput
  }

  export type CursoUpdateToOneWithWhereWithoutDisciplinasInput = {
    where?: CursoWhereInput
    data: XOR<CursoUpdateWithoutDisciplinasInput, CursoUncheckedUpdateWithoutDisciplinasInput>
  }

  export type CursoUpdateWithoutDisciplinasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUpdateManyWithoutCursosNestedInput
  }

  export type CursoUncheckedUpdateWithoutDisciplinasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
    professores?: UsuarioUncheckedUpdateManyWithoutCursosNestedInput
  }

  export type UsuarioUpsertWithoutDisciplinasInput = {
    update: XOR<UsuarioUpdateWithoutDisciplinasInput, UsuarioUncheckedUpdateWithoutDisciplinasInput>
    create: XOR<UsuarioCreateWithoutDisciplinasInput, UsuarioUncheckedCreateWithoutDisciplinasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutDisciplinasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutDisciplinasInput, UsuarioUncheckedUpdateWithoutDisciplinasInput>
  }

  export type UsuarioUpdateWithoutDisciplinasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutDisciplinasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type NotaUpsertWithWhereUniqueWithoutDisciplinaInput = {
    where: NotaWhereUniqueInput
    update: XOR<NotaUpdateWithoutDisciplinaInput, NotaUncheckedUpdateWithoutDisciplinaInput>
    create: XOR<NotaCreateWithoutDisciplinaInput, NotaUncheckedCreateWithoutDisciplinaInput>
  }

  export type NotaUpdateWithWhereUniqueWithoutDisciplinaInput = {
    where: NotaWhereUniqueInput
    data: XOR<NotaUpdateWithoutDisciplinaInput, NotaUncheckedUpdateWithoutDisciplinaInput>
  }

  export type NotaUpdateManyWithWhereWithoutDisciplinaInput = {
    where: NotaScalarWhereInput
    data: XOR<NotaUpdateManyMutationInput, NotaUncheckedUpdateManyWithoutDisciplinaInput>
  }

  export type TurmaUpsertWithWhereUniqueWithoutDisciplinasInput = {
    where: TurmaWhereUniqueInput
    update: XOR<TurmaUpdateWithoutDisciplinasInput, TurmaUncheckedUpdateWithoutDisciplinasInput>
    create: XOR<TurmaCreateWithoutDisciplinasInput, TurmaUncheckedCreateWithoutDisciplinasInput>
  }

  export type TurmaUpdateWithWhereUniqueWithoutDisciplinasInput = {
    where: TurmaWhereUniqueInput
    data: XOR<TurmaUpdateWithoutDisciplinasInput, TurmaUncheckedUpdateWithoutDisciplinasInput>
  }

  export type TurmaUpdateManyWithWhereWithoutDisciplinasInput = {
    where: TurmaScalarWhereInput
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyWithoutDisciplinasInput>
  }

  export type AlunoCreateWithoutNotasInput = {
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turma: TurmaCreateNestedOneWithoutAlunosInput
    encarregado?: UsuarioCreateNestedOneWithoutAlunosInput
    curso: CursoCreateNestedOneWithoutAlunosInput
  }

  export type AlunoUncheckedCreateWithoutNotasInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    encarregadoId?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AlunoCreateOrConnectWithoutNotasInput = {
    where: AlunoWhereUniqueInput
    create: XOR<AlunoCreateWithoutNotasInput, AlunoUncheckedCreateWithoutNotasInput>
  }

  export type DisciplinaCreateWithoutNotasInput = {
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    curso: CursoCreateNestedOneWithoutDisciplinasInput
    professor?: UsuarioCreateNestedOneWithoutDisciplinasInput
    turmas?: TurmaCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaUncheckedCreateWithoutNotasInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    turmas?: TurmaUncheckedCreateNestedManyWithoutDisciplinasInput
  }

  export type DisciplinaCreateOrConnectWithoutNotasInput = {
    where: DisciplinaWhereUniqueInput
    create: XOR<DisciplinaCreateWithoutNotasInput, DisciplinaUncheckedCreateWithoutNotasInput>
  }

  export type AlunoUpsertWithoutNotasInput = {
    update: XOR<AlunoUpdateWithoutNotasInput, AlunoUncheckedUpdateWithoutNotasInput>
    create: XOR<AlunoCreateWithoutNotasInput, AlunoUncheckedCreateWithoutNotasInput>
    where?: AlunoWhereInput
  }

  export type AlunoUpdateToOneWithWhereWithoutNotasInput = {
    where?: AlunoWhereInput
    data: XOR<AlunoUpdateWithoutNotasInput, AlunoUncheckedUpdateWithoutNotasInput>
  }

  export type AlunoUpdateWithoutNotasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turma?: TurmaUpdateOneRequiredWithoutAlunosNestedInput
    encarregado?: UsuarioUpdateOneWithoutAlunosNestedInput
    curso?: CursoUpdateOneRequiredWithoutAlunosNestedInput
  }

  export type AlunoUncheckedUpdateWithoutNotasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaUpsertWithoutNotasInput = {
    update: XOR<DisciplinaUpdateWithoutNotasInput, DisciplinaUncheckedUpdateWithoutNotasInput>
    create: XOR<DisciplinaCreateWithoutNotasInput, DisciplinaUncheckedCreateWithoutNotasInput>
    where?: DisciplinaWhereInput
  }

  export type DisciplinaUpdateToOneWithWhereWithoutNotasInput = {
    where?: DisciplinaWhereInput
    data: XOR<DisciplinaUpdateWithoutNotasInput, DisciplinaUncheckedUpdateWithoutNotasInput>
  }

  export type DisciplinaUpdateWithoutNotasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutDisciplinasNestedInput
    professor?: UsuarioUpdateOneWithoutDisciplinasNestedInput
    turmas?: TurmaUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateWithoutNotasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turmas?: TurmaUncheckedUpdateManyWithoutDisciplinasNestedInput
  }

  export type UsuarioCreateWithoutMensagensEnviadasInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMensagensEnviadasInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutMensagensEnviadasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutMensagensEnviadasInput, UsuarioUncheckedCreateWithoutMensagensEnviadasInput>
  }

  export type UsuarioCreateWithoutMensagensRecebidasInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMensagensRecebidasInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutMensagensRecebidasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutMensagensRecebidasInput, UsuarioUncheckedCreateWithoutMensagensRecebidasInput>
  }

  export type UsuarioUpsertWithoutMensagensEnviadasInput = {
    update: XOR<UsuarioUpdateWithoutMensagensEnviadasInput, UsuarioUncheckedUpdateWithoutMensagensEnviadasInput>
    create: XOR<UsuarioCreateWithoutMensagensEnviadasInput, UsuarioUncheckedCreateWithoutMensagensEnviadasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutMensagensEnviadasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutMensagensEnviadasInput, UsuarioUncheckedUpdateWithoutMensagensEnviadasInput>
  }

  export type UsuarioUpdateWithoutMensagensEnviadasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMensagensEnviadasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUpsertWithoutMensagensRecebidasInput = {
    update: XOR<UsuarioUpdateWithoutMensagensRecebidasInput, UsuarioUncheckedUpdateWithoutMensagensRecebidasInput>
    create: XOR<UsuarioCreateWithoutMensagensRecebidasInput, UsuarioUncheckedCreateWithoutMensagensRecebidasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutMensagensRecebidasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutMensagensRecebidasInput, UsuarioUncheckedUpdateWithoutMensagensRecebidasInput>
  }

  export type UsuarioUpdateWithoutMensagensRecebidasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMensagensRecebidasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutReunioesAgendadasInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutReunioesAgendadasInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutReunioesAgendadasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutReunioesAgendadasInput, UsuarioUncheckedCreateWithoutReunioesAgendadasInput>
  }

  export type ReuniaoParticipanteCreateWithoutReuniaoInput = {
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutReunioesInput
  }

  export type ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput = {
    id?: number
    usuarioId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoParticipanteCreateOrConnectWithoutReuniaoInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    create: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput>
  }

  export type ReuniaoParticipanteCreateManyReuniaoInputEnvelope = {
    data: ReuniaoParticipanteCreateManyReuniaoInput | ReuniaoParticipanteCreateManyReuniaoInput[]
  }

  export type UsuarioUpsertWithoutReunioesAgendadasInput = {
    update: XOR<UsuarioUpdateWithoutReunioesAgendadasInput, UsuarioUncheckedUpdateWithoutReunioesAgendadasInput>
    create: XOR<UsuarioCreateWithoutReunioesAgendadasInput, UsuarioUncheckedCreateWithoutReunioesAgendadasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutReunioesAgendadasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutReunioesAgendadasInput, UsuarioUncheckedUpdateWithoutReunioesAgendadasInput>
  }

  export type UsuarioUpdateWithoutReunioesAgendadasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutReunioesAgendadasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type ReuniaoParticipanteUpsertWithWhereUniqueWithoutReuniaoInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    update: XOR<ReuniaoParticipanteUpdateWithoutReuniaoInput, ReuniaoParticipanteUncheckedUpdateWithoutReuniaoInput>
    create: XOR<ReuniaoParticipanteCreateWithoutReuniaoInput, ReuniaoParticipanteUncheckedCreateWithoutReuniaoInput>
  }

  export type ReuniaoParticipanteUpdateWithWhereUniqueWithoutReuniaoInput = {
    where: ReuniaoParticipanteWhereUniqueInput
    data: XOR<ReuniaoParticipanteUpdateWithoutReuniaoInput, ReuniaoParticipanteUncheckedUpdateWithoutReuniaoInput>
  }

  export type ReuniaoParticipanteUpdateManyWithWhereWithoutReuniaoInput = {
    where: ReuniaoParticipanteScalarWhereInput
    data: XOR<ReuniaoParticipanteUpdateManyMutationInput, ReuniaoParticipanteUncheckedUpdateManyWithoutReuniaoInput>
  }

  export type ReuniaoCreateWithoutParticipantesInput = {
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    criadoPor?: UsuarioCreateNestedOneWithoutReunioesAgendadasInput
  }

  export type ReuniaoUncheckedCreateWithoutParticipantesInput = {
    id?: number
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    criadoPorId?: number | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ReuniaoCreateOrConnectWithoutParticipantesInput = {
    where: ReuniaoWhereUniqueInput
    create: XOR<ReuniaoCreateWithoutParticipantesInput, ReuniaoUncheckedCreateWithoutParticipantesInput>
  }

  export type UsuarioCreateWithoutReunioesInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutReunioesInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutReunioesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutReunioesInput, UsuarioUncheckedCreateWithoutReunioesInput>
  }

  export type ReuniaoUpsertWithoutParticipantesInput = {
    update: XOR<ReuniaoUpdateWithoutParticipantesInput, ReuniaoUncheckedUpdateWithoutParticipantesInput>
    create: XOR<ReuniaoCreateWithoutParticipantesInput, ReuniaoUncheckedCreateWithoutParticipantesInput>
    where?: ReuniaoWhereInput
  }

  export type ReuniaoUpdateToOneWithWhereWithoutParticipantesInput = {
    where?: ReuniaoWhereInput
    data: XOR<ReuniaoUpdateWithoutParticipantesInput, ReuniaoUncheckedUpdateWithoutParticipantesInput>
  }

  export type ReuniaoUpdateWithoutParticipantesInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    criadoPor?: UsuarioUpdateOneWithoutReunioesAgendadasNestedInput
  }

  export type ReuniaoUncheckedUpdateWithoutParticipantesInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpsertWithoutReunioesInput = {
    update: XOR<UsuarioUpdateWithoutReunioesInput, UsuarioUncheckedUpdateWithoutReunioesInput>
    create: XOR<UsuarioCreateWithoutReunioesInput, UsuarioUncheckedCreateWithoutReunioesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutReunioesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutReunioesInput, UsuarioUncheckedUpdateWithoutReunioesInput>
  }

  export type UsuarioUpdateWithoutReunioesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutReunioesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutFeedbacksInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorCreateNestedOneWithoutProfessorInput
  }

  export type UsuarioUncheckedCreateWithoutFeedbacksInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    codigoProfessor?: CodigoProfessorUncheckedCreateNestedOneWithoutProfessorInput
  }

  export type UsuarioCreateOrConnectWithoutFeedbacksInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutFeedbacksInput, UsuarioUncheckedCreateWithoutFeedbacksInput>
  }

  export type UsuarioUpsertWithoutFeedbacksInput = {
    update: XOR<UsuarioUpdateWithoutFeedbacksInput, UsuarioUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UsuarioCreateWithoutFeedbacksInput, UsuarioUncheckedCreateWithoutFeedbacksInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutFeedbacksInput, UsuarioUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UsuarioUpdateWithoutFeedbacksInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutFeedbacksInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
  }

  export type UsuarioCreateWithoutCodigoProfessorInput = {
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaCreateNestedManyWithoutProfessorInput
    cursos?: CursoCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoCreateNestedManyWithoutCriadoPorInput
    feedbacks?: FeedbackCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCodigoProfessorInput = {
    id?: number
    nome: string
    email: string
    senha: string
    telefone: string
    perfil: string
    imagem?: string | null
    relacaoEducando?: string | null
    codigoVerificacao?: string | null
    ultimoLogin?: Date | string | null
    ativo?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    alunos?: AlunoUncheckedCreateNestedManyWithoutEncarregadoInput
    turmas?: TurmaUncheckedCreateNestedManyWithoutProfessorInput
    disciplinas?: DisciplinaUncheckedCreateNestedManyWithoutProfessorInput
    cursos?: CursoUncheckedCreateNestedManyWithoutProfessoresInput
    mensagensEnviadas?: MensagemUncheckedCreateNestedManyWithoutRemetenteInput
    mensagensRecebidas?: MensagemUncheckedCreateNestedManyWithoutDestinatarioInput
    reunioes?: ReuniaoParticipanteUncheckedCreateNestedManyWithoutUsuarioInput
    reunioesAgendadas?: ReuniaoUncheckedCreateNestedManyWithoutCriadoPorInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCodigoProfessorInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCodigoProfessorInput, UsuarioUncheckedCreateWithoutCodigoProfessorInput>
  }

  export type UsuarioUpsertWithoutCodigoProfessorInput = {
    update: XOR<UsuarioUpdateWithoutCodigoProfessorInput, UsuarioUncheckedUpdateWithoutCodigoProfessorInput>
    create: XOR<UsuarioCreateWithoutCodigoProfessorInput, UsuarioUncheckedCreateWithoutCodigoProfessorInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCodigoProfessorInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCodigoProfessorInput, UsuarioUncheckedUpdateWithoutCodigoProfessorInput>
  }

  export type UsuarioUpdateWithoutCodigoProfessorInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCodigoProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    cursos?: CursoUncheckedUpdateManyWithoutProfessoresNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type AlunoCreateManyEncarregadoInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type TurmaCreateManyProfessorInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    cursoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DisciplinaCreateManyProfessorInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type MensagemCreateManyRemetenteInput = {
    id?: number
    conteudo: string
    destinatarioId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type MensagemCreateManyDestinatarioInput = {
    id?: number
    conteudo: string
    remetenteId: number
    lida?: boolean
    lidaEm?: Date | string | null
    editadoEm?: Date | string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    deletadoParaRemetente?: boolean
    deletadoParaDestinatario?: boolean
    arquivoUrl?: string | null
    arquivoNome?: string | null
    arquivoTipo?: string | null
    arquivoTamanho?: number | null
  }

  export type ReuniaoParticipanteCreateManyUsuarioInput = {
    id?: number
    reuniaoId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoCreateManyCriadoPorInput = {
    id?: number
    titulo: string
    descricao?: string | null
    local: string
    linkMeeting?: string | null
    dataHora?: Date | string | null
    status?: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type FeedbackCreateManyUsuarioInput = {
    id?: number
    nome: string
    email: string
    assunto: string
    mensagem: string
    avaliacao?: number | null
    categoria?: string
    status?: string
    resposta?: string | null
    respondidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type AlunoUpdateWithoutEncarregadoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turma?: TurmaUpdateOneRequiredWithoutAlunosNestedInput
    curso?: CursoUpdateOneRequiredWithoutAlunosNestedInput
    notas?: NotaUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateWithoutEncarregadoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateManyWithoutEncarregadoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaUpdateWithoutProfessorInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneWithoutTurmasNestedInput
    alunos?: AlunoUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateWithoutProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateManyWithoutProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaUpdateWithoutProfessorInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutDisciplinasNestedInput
    notas?: NotaUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateWithoutProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateManyWithoutProfessorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CursoUpdateWithoutProfessoresInput = {
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateWithoutProfessoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutCursoNestedInput
    alunos?: AlunoUncheckedUpdateManyWithoutCursoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutCursoNestedInput
  }

  export type CursoUncheckedUpdateManyWithoutProfessoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    duracaoMeses?: NullableIntFieldUpdateOperationsInput | number | null
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MensagemUpdateWithoutRemetenteInput = {
    conteudo?: StringFieldUpdateOperationsInput | string
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
    destinatario?: UsuarioUpdateOneRequiredWithoutMensagensRecebidasNestedInput
  }

  export type MensagemUncheckedUpdateWithoutRemetenteInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    destinatarioId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MensagemUncheckedUpdateManyWithoutRemetenteInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    destinatarioId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MensagemUpdateWithoutDestinatarioInput = {
    conteudo?: StringFieldUpdateOperationsInput | string
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
    remetente?: UsuarioUpdateOneRequiredWithoutMensagensEnviadasNestedInput
  }

  export type MensagemUncheckedUpdateWithoutDestinatarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    remetenteId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MensagemUncheckedUpdateManyWithoutDestinatarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    conteudo?: StringFieldUpdateOperationsInput | string
    remetenteId?: IntFieldUpdateOperationsInput | number
    lida?: BoolFieldUpdateOperationsInput | boolean
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    editadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    deletadoParaRemetente?: BoolFieldUpdateOperationsInput | boolean
    deletadoParaDestinatario?: BoolFieldUpdateOperationsInput | boolean
    arquivoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoNome?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTipo?: NullableStringFieldUpdateOperationsInput | string | null
    arquivoTamanho?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReuniaoParticipanteUpdateWithoutUsuarioInput = {
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    reuniao?: ReuniaoUpdateOneRequiredWithoutParticipantesNestedInput
  }

  export type ReuniaoParticipanteUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    reuniaoId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    reuniaoId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoUpdateWithoutCriadoPorInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    participantes?: ReuniaoParticipanteUpdateManyWithoutReuniaoNestedInput
  }

  export type ReuniaoUncheckedUpdateWithoutCriadoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    participantes?: ReuniaoParticipanteUncheckedUpdateManyWithoutReuniaoNestedInput
  }

  export type ReuniaoUncheckedUpdateManyWithoutCriadoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    local?: StringFieldUpdateOperationsInput | string
    linkMeeting?: NullableStringFieldUpdateOperationsInput | string | null
    dataHora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutUsuarioInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    assunto?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    avaliacao?: NullableIntFieldUpdateOperationsInput | number | null
    categoria?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resposta?: NullableStringFieldUpdateOperationsInput | string | null
    respondidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaCreateManyAlunoInput = {
    id?: number
    valor: number
    tipo: string
    disciplinaId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaUpdateWithoutAlunoInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplina?: DisciplinaUpdateOneRequiredWithoutNotasNestedInput
  }

  export type NotaUncheckedUpdateWithoutAlunoInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    disciplinaId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaUncheckedUpdateManyWithoutAlunoInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    disciplinaId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlunoCreateManyTurmaInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    encarregadoId?: number | null
    cursoId: number
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AlunoUpdateWithoutTurmaInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    encarregado?: UsuarioUpdateOneWithoutAlunosNestedInput
    curso?: CursoUpdateOneRequiredWithoutAlunosNestedInput
    notas?: NotaUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateWithoutTurmaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateManyWithoutTurmaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaUpdateWithoutTurmasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    curso?: CursoUpdateOneRequiredWithoutDisciplinasNestedInput
    professor?: UsuarioUpdateOneWithoutDisciplinasNestedInput
    notas?: NotaUpdateManyWithoutDisciplinaNestedInput
  }

  export type DisciplinaUncheckedUpdateWithoutTurmasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutDisciplinaNestedInput
  }

  export type DisciplinaUncheckedUpdateManyWithoutTurmasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: IntFieldUpdateOperationsInput | number
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaCreateManyCursoInput = {
    id?: number
    nome: string
    codigo?: string | null
    descricao: string
    cargaHoraria?: number | null
    semestre?: number | null
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AlunoCreateManyCursoInput = {
    id?: number
    nome: string
    matricula: string
    telefone: string
    email?: string | null
    imagem?: string | null
    classe: string
    dataNascimento?: Date | string | null
    endereco?: string | null
    turmaId: number
    encarregadoId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type TurmaCreateManyCursoInput = {
    id?: number
    nome: string
    ano?: number
    semestre?: number | null
    capacidade?: number | null
    turno?: string | null
    professorId?: number | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type DisciplinaUpdateWithoutCursoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutDisciplinasNestedInput
    notas?: NotaUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutDisciplinaNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutDisciplinasNestedInput
  }

  export type DisciplinaUncheckedUpdateManyWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    codigo?: NullableStringFieldUpdateOperationsInput | string | null
    descricao?: StringFieldUpdateOperationsInput | string
    cargaHoraria?: NullableIntFieldUpdateOperationsInput | number | null
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlunoUpdateWithoutCursoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    turma?: TurmaUpdateOneRequiredWithoutAlunosNestedInput
    encarregado?: UsuarioUpdateOneWithoutAlunosNestedInput
    notas?: NotaUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    notas?: NotaUncheckedUpdateManyWithoutAlunoNestedInput
  }

  export type AlunoUncheckedUpdateManyWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    matricula?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    classe?: StringFieldUpdateOperationsInput | string
    dataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    turmaId?: IntFieldUpdateOperationsInput | number
    encarregadoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaUpdateWithoutCursoInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutTurmasNestedInput
    alunos?: AlunoUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutTurmaNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutTurmasNestedInput
  }

  export type TurmaUncheckedUpdateManyWithoutCursoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpdateWithoutCursosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUpdateManyWithoutProfessorNestedInput
    mensagensEnviadas?: MensagemUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCursosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutEncarregadoNestedInput
    turmas?: TurmaUncheckedUpdateManyWithoutProfessorNestedInput
    disciplinas?: DisciplinaUncheckedUpdateManyWithoutProfessorNestedInput
    mensagensEnviadas?: MensagemUncheckedUpdateManyWithoutRemetenteNestedInput
    mensagensRecebidas?: MensagemUncheckedUpdateManyWithoutDestinatarioNestedInput
    reunioes?: ReuniaoParticipanteUncheckedUpdateManyWithoutUsuarioNestedInput
    reunioesAgendadas?: ReuniaoUncheckedUpdateManyWithoutCriadoPorNestedInput
    codigoProfessor?: CodigoProfessorUncheckedUpdateOneWithoutProfessorNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateManyWithoutCursosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    perfil?: StringFieldUpdateOperationsInput | string
    imagem?: NullableStringFieldUpdateOperationsInput | string | null
    relacaoEducando?: NullableStringFieldUpdateOperationsInput | string | null
    codigoVerificacao?: NullableStringFieldUpdateOperationsInput | string | null
    ultimoLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ativo?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaCreateManyDisciplinaInput = {
    id?: number
    valor: number
    tipo: string
    alunoId: number
    semestre?: number
    observacao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type NotaUpdateWithoutDisciplinaInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    aluno?: AlunoUpdateOneRequiredWithoutNotasNestedInput
  }

  export type NotaUncheckedUpdateWithoutDisciplinaInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alunoId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotaUncheckedUpdateManyWithoutDisciplinaInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alunoId?: IntFieldUpdateOperationsInput | number
    semestre?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurmaUpdateWithoutDisciplinasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    professor?: UsuarioUpdateOneWithoutTurmasNestedInput
    curso?: CursoUpdateOneWithoutTurmasNestedInput
    alunos?: AlunoUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateWithoutDisciplinasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    alunos?: AlunoUncheckedUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateManyWithoutDisciplinasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    semestre?: NullableIntFieldUpdateOperationsInput | number | null
    capacidade?: NullableIntFieldUpdateOperationsInput | number | null
    turno?: NullableStringFieldUpdateOperationsInput | string | null
    professorId?: NullableIntFieldUpdateOperationsInput | number | null
    cursoId?: NullableIntFieldUpdateOperationsInput | number | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteCreateManyReuniaoInput = {
    id?: number
    usuarioId: number
    status?: string
    confirmadoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type ReuniaoParticipanteUpdateWithoutReuniaoInput = {
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutReunioesNestedInput
  }

  export type ReuniaoParticipanteUncheckedUpdateWithoutReuniaoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReuniaoParticipanteUncheckedUpdateManyWithoutReuniaoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    confirmadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UsuarioCountOutputTypeDefaultArgs instead
     */
    export type UsuarioCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsuarioCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlunoCountOutputTypeDefaultArgs instead
     */
    export type AlunoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlunoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TurmaCountOutputTypeDefaultArgs instead
     */
    export type TurmaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TurmaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CursoCountOutputTypeDefaultArgs instead
     */
    export type CursoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CursoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisciplinaCountOutputTypeDefaultArgs instead
     */
    export type DisciplinaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisciplinaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReuniaoCountOutputTypeDefaultArgs instead
     */
    export type ReuniaoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReuniaoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsuarioDefaultArgs instead
     */
    export type UsuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsuarioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlunoDefaultArgs instead
     */
    export type AlunoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlunoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TurmaDefaultArgs instead
     */
    export type TurmaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TurmaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CursoDefaultArgs instead
     */
    export type CursoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CursoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisciplinaDefaultArgs instead
     */
    export type DisciplinaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisciplinaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotaDefaultArgs instead
     */
    export type NotaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MensagemDefaultArgs instead
     */
    export type MensagemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MensagemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvisoDefaultArgs instead
     */
    export type AvisoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvisoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventoDefaultArgs instead
     */
    export type EventoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReuniaoDefaultArgs instead
     */
    export type ReuniaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReuniaoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReuniaoParticipanteDefaultArgs instead
     */
    export type ReuniaoParticipanteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReuniaoParticipanteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RelatorioDefaultArgs instead
     */
    export type RelatorioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RelatorioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeedbackDefaultArgs instead
     */
    export type FeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeedbackDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CodigoProfessorDefaultArgs instead
     */
    export type CodigoProfessorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CodigoProfessorDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}