# spacex-backend

openapi: 3.0.0
info:
  title: SpaceX API
  description: API para interação com os dados do SpaceX
  version: 1.0.0
servers:
  - url: http://localhost:{port}/
    description: Servidor de desenvolvimento

paths:
  /api/v1/users:
    get:
      summary: Obtém a lista de usuários
      responses:
        '201':
          ok: true
        '500':
          ok: false
    post:
      summary: Cria um novo usuário
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          ok: true
        '500':
          ok: false

  /api/v1/launchers:
    get:
      summary: Obtém todos os lançadores
      responses:
        '201':
          ok: true
        '500':
          ok: false

  /api/v1/launchers/{id}:
    get:
      summary: Obtém um lançador pelo ID
      parameters:
        - in: path
          name: id
          required: true
          description: ID do lançador
          schema:
            type: string
      responses:
        '201':
          ok: true
        '500':
          ok: false

  /api/v1/rockets:
    get:
      summary: Obtém todos os foguetes
      responses:
        '201':
          ok: true
        '500':
          ok: false

  /api/v1/rockets/{id}:
    get:
      summary: Obtém um foguete pelo ID
      parameters:
        - in: path
          name: id
          required: true
          description: ID do foguete
          schema:
            type: string
      responses:
        '201':
          ok: true
        '500':
          ok: false


  /api/v1/stats:
    get:
      summary: Obtém as estatísticas
      responses:
        '200':
          ok: true
        '500':
          ok: false

components:
  schemas:
    Launches:
      type: object
      properties:
        flight_number:
          type: number
          description: Número do voo
        mission_name:
          type: string
          description: Nome da missão
        mission_id:
          type: array
          items:
            type: string
          description: ID da missão
        upcoming:
          type: boolean
          description: Indica se o lançamento está programado para o futuro
        launch_year:
          type: string
          description: Ano de lançamento
        launch_date_unix:
          type: number
          description: Data de lançamento em formato UNIX
        launch_date_utc:
          type: string
          format: date-time
          description: Data de lançamento no formato UTC
        launch_date_local:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
    Rocket:
      type: object
      properties:
        rocket_id:
          type: string
          description: ID do foguete
        rocket_name:
          type: string
          description: Nome do foguete
        rocket_type:
          type: string
          description: Tipo de foguete
        first_stage:
          type: object
          properties:
            cores:
              type: array
              items:
                type: object
              description: Detalhes das fases iniciais
          description: Primeira fase do foguete
        second_stage:
          type: object
          properties:
            block:
              type: number
              description: Número do bloco da segunda fase
            payloads:
              type: array
              items:
                type: object
              description: Detalhes das cargas úteis da segunda fase
          description: Segunda fase do foguete
        fairings:
          type: object
          properties:
            reused:
              type: boolean
              description: Indica se a carenagem foi reutilizada
            recovery_attempt:
              type: boolean
              description: Indica se houve tentativa de recuperação
            recovered:
              type: boolean
              description: Indica se a carenagem foi recuperada
            ship:
              type: string
              description: Nome do navio associado à carenagem
          description: Detalhes da carenagem
      required:
        - rocket_id
        - rocket_name
        - rocket_type
      

