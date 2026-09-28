// サイトの内容はこのファイルだけで編集できます。
// 画像は images/ 内の同じファイル名で上書きすると差し替わります（一覧は IMAGES.md）。

export const PROFILE = {
  name: '叶内健大',
  role: 'Web & System Developer',
  email: 'nagatoyukiza1234@gmail.com',
  // 外部サービスのプロフィールURL（不要なら空文字に）
  profileUrl: '',
  profileLabel: 'プロフィールページ',
  // フォーム送信先。FormSubmit（無料・登録不要）で上のメールアドレスに届きます。
  // 最初の1通目の送信時に、FormSubmit から有効化メールが届くので、リンクを押して有効化してください。
  // 空にすると送信せず、メールでの連絡を案内します
  formEndpoint: 'https://formsubmit.co/ajax/nagatoyukiza1234@gmail.com',
};

export const CATEGORIES = [
  { id: 'web', label: 'Webサイト・LP' },
  { id: 'ec', label: 'ECサイト' },
  { id: 'system', label: '業務システム・CRM' },
  { id: '3d', label: '3D・アプリ' },
  { id: 'ai', label: 'AI・自動化' },
];

export const WORKS = [
  {
    slug: 'gym-lp',
    category: 'web',
    title: 'パーソナルジムの集客LP・ダイエットプログラムLP',
    client: 'ニューヨークのパーソナルトレーニングジム',
    summary: '体験申込を増やす集客LPと、高単価ダイエットプログラムのLPの2ページを、構成・デザインから実装までゼロから制作しました。',
    platform: 'Wix',
    scope: ['企画・構成', 'デザイン', 'コーディング'],
    points: [
      'ジムのブランドイメージに合わせたデザインを一から作成',
      '20〜60代の男女を想定し、悩み → 解決 → 実績 → 申込の順に導線を設計',
      '高単価プログラムは不安を解消するFAQと料金の見せ方を重視',
      'PC・スマートフォンそれぞれで読みやすいレイアウトに最適化',
    ],
    tags: ['Wix', 'LP設計', 'レスポンシブ', 'CV導線'],
    images: [
      { file: '01.jpg', caption: '集客LP ファーストビュー（PC）' },
      { file: '02.jpg', caption: '集客LP 全体（スマートフォン）' },
      { file: '03.jpg', caption: 'ダイエットプログラムLP ファーストビュー（PC）' },
      { file: '04.jpg', caption: 'ダイエットプログラムLP 料金・申込セクション' },
    ],
  },
  {
    slug: 'event-portal',
    category: 'web',
    title: '異業種交流会の公式サイト',
    client: '月100回以上の異業種交流会を主催する団体',
    summary: 'WordPressテーマ「SWELL」を使い、トップからすぐにイベントを探せるプロモーションサイトをゼロから構築。大量のイベントを楽に掲載・更新できる設計です。',
    platform: 'WordPress（SWELL）',
    scope: ['企画・デザイン構成', 'デザイン', 'コーディング', 'WordPress導入', 'SEO対策'],
    points: [
      'トップページに検索を配置し、日付・エリア・テーマからすぐに探せる導線',
      '常時300件、将来1,000件以上の掲載を見据えた投稿・カテゴリ設計',
      '終了したイベントもSEO資産として残るアーカイブ構成',
      'スマートフォンでも申込までストレスなく進めるレスポンシブ設計',
    ],
    tags: ['WordPress', 'SWELL', 'SEO', 'イベント検索'],
    images: [
      { file: '01.jpg', caption: 'トップページ（イベント検索）' },
      { file: '02.jpg', caption: 'イベント一覧（カード表示）' },
      { file: '03.jpg', caption: 'イベント詳細・参加申込フォーム' },
      { file: '04.jpg', caption: 'スマートフォン表示' },
    ],
  },
  {
    slug: 'wp-elementor',
    category: 'web',
    title: 'WordPress（Elementor）での企業サイト構築',
    client: '企業のコーポレートサイト',
    summary: 'WordPressとElementorで企業サイトをゼロから構築。統一感のあるデザインルールと、スマートフォンでも見やすく操作しやすいUIを設計しました。',
    platform: 'WordPress（Elementor）',
    scope: ['デザイン', '構築', 'テスト'],
    points: [
      '配色・余白・見出しのルールを定め、サイト全体に統一感を持たせる設計',
      'タップ領域や文字サイズを設計段階から最適化し、スマートフォンでの使いやすさを確保',
      'トップと下層1ページで方向性を確認してから、全ページへ展開',
    ],
    tags: ['WordPress', 'Elementor', 'HTML/CSS', 'UI設計'],
    images: [
      { file: '01.png', caption: 'トップページ（PC）' },
      { file: '02.png', caption: 'トップページ（スマートフォン）' },
      { file: '03.png', caption: '下層ページ' },
    ],
  },
  {
    slug: 'hubspot-corporate',
    category: 'web',
    title: 'HubSpot CMSでのコーポレートサイト構築',
    client: '企業のコーポレートサイト',
    summary: 'HubSpot上にコーポレートサイトをゼロから構築し、問い合わせフォームとCRMをつなげて営業につながる導線を整えました。',
    platform: 'HubSpot CMS',
    scope: ['デザイン', 'コーディング', 'CMS構築'],
    points: [
      'フォームとCRMを連携し、問い合わせをそのまま営業管理へ',
      '担当者が自分で更新しやすいモジュール構成',
      'PC・スマートフォン両対応のレスポンシブデザイン',
    ],
    tags: ['HubSpot', 'CMS', 'CRM連携'],
    images: [
      { file: '01.png', caption: 'トップページ（PC）' },
      { file: '02.png', caption: 'サービス紹介ページ' },
      { file: '03.png', caption: 'お問い合わせフォーム' },
      { file: '04.png', caption: 'スマートフォン表示' },
    ],
  },
  {
    slug: 'makeshop-ec',
    category: 'ec',
    title: 'makeshop 新規ECサイトの構築',
    client: 'EC事業者（makeshop新規出店）',
    summary: 'Figmaのデザインをもとに、makeshopの新規ECサイトをHTML・CSS・JavaScriptでゼロから実装しました。',
    platform: 'makeshop',
    scope: ['コーディング', 'makeshop構築'],
    points: [
      'Figmaデザインを忠実に再現するページ構造をゼロから実装',
      'ホバー時の色反転・拡大、スムーススクロールなどの演出を実装',
      '短納期のスケジュールに合わせて段階的に納品',
    ],
    tags: ['makeshop', 'HTML/CSS', 'JavaScript', 'Figma'],
    images: [
      { file: '01.png', caption: 'トップページ（PC）' },
      { file: '02.png', caption: '商品一覧ページ' },
      { file: '03.png', caption: '商品詳細ページ' },
      { file: '04.png', caption: 'スマートフォン表示' },
    ],
  },
  {
    slug: 'ec-english',
    category: 'ec',
    title: '海外向け英語ECサイトの構築',
    client: '国内メーカーの公式ECサイト',
    summary: '海外のお客様が英語で商品選びから購入まで迷わず進められるECサイトを、ゼロから構築しました。',
    platform: 'ECサイト（多言語化）',
    scope: ['設計', 'コーディング', '多言語対応'],
    points: [
      '海外のお客様が迷わない、商品選びから購入までの導線を設計',
      '商品情報・カート・決済までの英語表記を整備',
      '言語切り替えを分かりやすい位置に配置',
    ],
    tags: ['EC', '多言語化', '英語版'],
    images: [
      { file: '01.jpg', caption: '英語版トップページ' },
      { file: '02.jpg', caption: '英語版 商品ページ' },
      { file: '03.jpg', caption: 'カート・購入手続き' },
      { file: '04.jpg', caption: '言語切り替え（スマートフォン）' },
    ],
  },
  {
    slug: 'salesforce-ae',
    category: 'system',
    title: 'Salesforce｜営業ダッシュボードとAPI連携の構築',
    client: 'Salesforceを利用するBtoB企業',
    summary: 'Salesforce上に、営業ダッシュボード・ハローワークAPI連携・レコード検索の仕組みをゼロから構築。Account Engagement（旧Pardot）の整理もあわせて担当しました。',
    platform: 'Salesforce / Account Engagement',
    scope: ['設計', '開発', '運用設計'],
    points: [
      '営業ダッシュボードをゼロから設計・構築',
      'ハローワークAPIとの連携を新規に開発',
      'Account Engagementのオートメーション・フォームを整理し、影響なく停止',
      'レコードハンターを導入し、必要なレコードをすぐ探せる環境を実装',
    ],
    tags: ['Salesforce', 'Account Engagement', 'API連携', 'ダッシュボード'],
    images: [
      { file: '01.jpg', caption: '営業ダッシュボード' },
      { file: '02.jpg', caption: 'ハローワークAPI連携の画面・フロー' },
      { file: '03.jpg', caption: 'レコードハンターでの検索画面' },
      { file: '04.jpg', caption: 'Account Engagement 整理表（機密部分は伏せて）' },
    ],
  },
  {
    slug: 'clinic-call',
    category: 'system',
    title: '美容クリニックの院内呼び出しシステム',
    client: '美容クリニック',
    summary: '診察室で患者番号を送ると、受付PCに大きくポップアップ表示される院内ツールをゼロから開発。サーバー管理がいらないシンプルな構成で、院内でも修正しやすくしました。',
    platform: 'Webアプリ（サーバーレス）',
    scope: ['要件定義', '設計', '開発', 'テスト', '導入'],
    points: [
      '「12番の方を診察室1へご案内ください」を受付PCに全画面で表示',
      '通知音つきで、「確認しました」を押すまで消えない仕様',
      '最新の呼び出しを大きく、直近の履歴もあわせて表示',
      '1秒以内に反映され、サーバー管理が不要な構成',
    ],
    tags: ['Webアプリ', 'リアルタイム通知', 'サーバーレス'],
    images: [
      { file: '01.jpg', caption: '診察室側の入力画面（タブレット）' },
      { file: '02.jpg', caption: '受付PCの全画面ポップアップ' },
      { file: '03.jpg', caption: '呼び出し履歴の表示' },
      { file: '04.jpg', caption: 'システム構成図' },
    ],
  },
  {
    slug: 'dog-walk-metaverse',
    category: '3d',
    title: 'デジタルセラピー犬アプリ｜マルチプレイ散歩空間の開発',
    client: '高齢者の孤立解消に取り組むスタートアップ',
    summary: 'Unity製バーチャルペットアプリの、ほかのユーザーと犬の散歩ができるメタバース空間をゼロから開発。近づくと声で会話できます。',
    platform: 'Unity 6 / Android',
    scope: ['要件定義', '設計', '開発', 'テスト', 'リリース'],
    points: [
      'Photon Fusion 2（Shared Mode）で1ルーム最大10人、空きルームへ自動マッチング',
      'アバターの位置・向きを同期し、犬がプレイヤーの後ろを自動で追従',
      'Photon Voice 2で近接音声。2m以内はフル音量、10m以上で無音、ミュート対応',
      'メイン画面とメタバース空間のシーン遷移、接続失敗時のエラーハンドリング',
    ],
    tags: ['Unity', 'C#', 'Photon Fusion 2', 'Photon Voice 2'],
    images: [
      { file: '01.jpg', caption: '「散歩に行く」ボタンのあるホーム画面' },
      { file: '02.jpg', caption: 'メタバース空間（俯瞰視点）' },
      { file: '03.jpg', caption: 'ほかのユーザーとのすれ違い・会話' },
      { file: '04.jpg', caption: 'ミュート・散歩終了などのUI' },
    ],
  },
  {
    slug: 'medical-video-ai',
    category: 'ai',
    title: '医療情報メディアの4言語AI動画 自動生成・配信',
    client: '泌尿器科専門医',
    summary: '台本生成からアバター動画、背景合成、4言語への吹き替え、SNS投稿までを自動化する仕組みをゼロから設計・構築。医師の作業を週1時間以内に抑えます。',
    platform: 'Make.com + 各種API',
    scope: ['コンサルティング', 'フロー設計', 'コスト試算', '構築'],
    points: [
      'Make.comを司令塔に、OpenAI・HeyGen・Creatomateを連携',
      '台本に合わせて背景の画像・動画を自動で差し込む合成ロジック',
      '日本語・英語・スペイン語・中国語へ声質を保ったまま吹き替え',
      '動画1本あたりのAPIコストを言語別に試算',
    ],
    tags: ['Make.com', 'OpenAI API', 'HeyGen API', 'Creatomate'],
    images: [
      { file: '01.png', caption: 'Make.com シナリオ全体図' },
      { file: '02.png', caption: '生成された動画（日本語）' },
      { file: '03.png', caption: '多言語版の比較' },
      { file: '04.png', caption: 'APIコスト試算表' },
    ],
  },
];

// image: サービスカードの画像（images/services/ のファイルを差し替えると変わります）
// includes: 詳細を開いたときの対応内容、period: 期間の目安、note: 補足
export const SERVICE_GROUPS = [
  {
    id: 'web',
    label: 'Web制作',
    lead: '集客と更新のしやすさを両立するサイトづくり。',
    items: [
      { image: 'images/services/lp.jpg', name: 'LP制作', desc: '構成から実装まで、集客効果の高いランディングページを制作します', price: 100000,
        includes: ['ヒアリング・競合調査をもとにした構成案', 'ワイヤーフレーム・デザイン制作', 'PC・スマートフォン対応のコーディング', 'フォーム設置・アクセス解析の導入'],
        period: '2〜4週間', note: '広告用・商品紹介用など、目的に合わせて構成を設計します。' },
      { image: 'images/services/homepage.jpg', name: 'ホームページ制作', desc: '集客導線まで設計する、高品質なホームページを制作します', price: 150000,
        includes: ['サイトマップ・導線設計', 'トップ・下層ページのデザイン', 'レスポンシブ対応のコーディング', 'お問い合わせフォーム・基本的なSEO設定'],
        period: '1〜2か月', note: 'ページ数や機能に応じてお見積りします。' },
      { image: 'images/services/wordpress.jpg', name: 'WordPress', desc: '自分たちで更新しやすいホームページ・LPを構築します', price: 80000,
        includes: ['テーマ選定またはオリジナルテーマ制作', 'お知らせ・ブログなど更新機能の構築', '更新マニュアルの作成・操作説明', 'セキュリティ・バックアップの初期設定'],
        period: '3〜6週間', note: '既存サイトのWordPress化・改修もご相談ください。' },
      { image: 'images/services/shopify.jpg', name: 'Shopify', desc: '売れる導線と安定運用のECサイトを構築します', price: 180000,
        includes: ['ストア設計・テーマのカスタマイズ', '商品・コレクション・決済の設定', '必要なアプリの選定と導入', '運用方法のご説明'],
        period: '1〜2か月', note: '既存ECからの移行にも対応します。' },
      { image: 'images/services/hubspot.jpg', name: 'HubSpot導入', desc: '営業導線とサイトを連携して、売上を最大化します', price: 150000,
        includes: ['HubSpot CMSでのサイト構築', 'フォームとCRMの連携設定', 'メール・ワークフローの初期設計', '担当者向けの運用サポート'],
        period: '1〜2か月', note: 'すでにHubSpotをお使いの場合の改善もご相談ください。' },
    ],
  },
  {
    id: 'system',
    label: 'システム・アプリ開発',
    lead: '業務の課題に合わせて、使われ続ける仕組みを設計します。',
    items: [
      { image: 'images/services/webai.jpg', name: 'Webシステム・AI機能', desc: '業務課題に合わせて、WebシステムとAI機能を設計開発します', price: 180000,
        includes: ['業務フローのヒアリングと要件定義', '画面・データ設計', 'Webアプリ開発・AI機能の組み込み', 'テスト・導入・運用サポート'],
        period: '1〜3か月', note: '小さく作って段階的に広げる進め方もできます。' },
      { image: 'images/services/unity.jpg', name: 'Unity・メタバース', desc: '没入感のあるメタバースや3D空間を開発します（IT企業向け）', price: 250000,
        includes: ['企画・仕様の整理', '3D空間・アバターの実装', 'マルチプレイ・音声通話などの通信機能', 'Android / iOS / PC 向けのビルドと公開'],
        period: '2〜4か月', note: '既存アプリへの機能追加にも対応します。' },
      { image: 'images/services/flutter.jpg', name: 'Flutter', desc: '企画から公開まで、スマホアプリを一貫開発します', price: null,
        includes: ['アプリの企画・画面設計', 'Flutterでの開発（iOS / Android）', 'API・データベースとの連携', 'ストア申請・公開のサポート'],
        period: '2〜4か月', note: '機能と画面数に応じてお見積りします。' },
      { image: 'images/services/liff.jpg', name: 'LINE LIFFアプリ', desc: 'LINE公式アカウントと連携するLIFFアプリで集客を強化します', price: 80000,
        includes: ['LINE公式アカウントとの連携設計', '予約・会員証・アンケートなどのLIFF画面', 'Messaging APIによる通知', '管理画面・データ連携'],
        period: '3〜6週間', note: 'リッチメニューの設計もあわせて対応します。' },
      { image: 'images/services/kintone.jpg', name: 'kintone', desc: 'アプリの新規開発・カスタマイズで、散らばった業務を整理します', price: 80000,
        includes: ['現在の業務・Excel管理のヒアリング', 'アプリ設計・新規作成', 'JavaScriptカスタマイズ・プラグイン導入', '外部サービスとの連携・運用ルールづくり'],
        period: '2〜6週間', note: '既存アプリの整理・改修だけのご依頼も可能です。' },
      { image: 'images/services/salesforce.jpg', name: 'Salesforce', desc: '新規構築から運用設計まで、一気通貫で対応します', price: 180000,
        includes: ['要件整理・オブジェクト設計', '画面・レポート・ダッシュボードの構築', 'フロー・Apexによる自動化', '外部APIとの連携・運用設計'],
        period: '1〜3か月', note: 'Account Engagementの設定・整理にも対応します。' },
    ],
  },
  {
    id: 'ai',
    label: 'AI・業務自動化',
    lead: '毎日の手作業と問い合わせ対応を、仕組みに置き換えます。',
    items: [
      { image: 'images/services/chatbot.jpg', name: 'AIチャットボット', desc: '問い合わせ対応を減らす、業務特化のAIチャットボットを開発します', price: 80000,
        includes: ['よくある質問・社内資料の整理', '業務に合わせた回答設計', 'Webサイト・LINE・社内ツールへの設置', '回答精度の検証と改善'],
        period: '3〜6週間', note: '社内向けのナレッジ検索にも活用できます。' },
      { image: 'images/services/gas.jpg', name: 'GAS・API連携', desc: 'GASとAPI連携で、毎日の手作業を仕組みに変えます', price: 30000,
        includes: ['自動化したい作業のヒアリング', 'Googleスプレッドシート・フォームの自動化', '外部サービスとのAPI連携', '動作確認と使い方のご説明'],
        period: '1〜3週間', note: '小さな自動化からお気軽にご相談ください。' },
      { image: 'images/services/automation.jpg', name: 'n8n・Make・Zapier', desc: '転記と確認作業を自動化します', price: null,
        includes: ['自動化フローの設計', '各サービスとの接続設定', 'エラー時の通知・運用設計', '運用マニュアルの作成'],
        period: '1〜4週間', note: 'ツールの選定からご提案します。' },
    ],
  },
];

// お客様の声。sample: true の間は「サンプル」の注記が表示されます。実際の声に差し替えたら false に
export const TESTIMONIALS = {
  sample: true,
  items: [
    { text: 'こちらの要望を丁寧に整理していただき、想像以上のLPに仕上がりました。公開後の体験申込も目に見えて増えています。', who: 'パーソナルジム 経営者', work: 'LP制作' },
    { text: '業務の流れから一緒に考えてくださったので、現場のスタッフもすぐに使いこなせました。修正の相談にもすぐ応えてもらえます。', who: 'クリニック 事務長', work: '院内システム開発' },
    { text: '専門的な内容も分かりやすく説明してもらえて、安心してお任せできました。進捗の共有がこまめで、やり取りがとてもスムーズでした。', who: 'スタートアップ 代表', work: 'アプリ開発' },
  ],
};

// 対応技術：トップページの「対応技術」に表示。icon は images/tech/ のファイル名（公式ロゴに差し替え可）
export const STACK = [
  { label: 'Frontend', lead: '画面・UI', items: [
    { name: 'HTML5', icon: 'html5' }, { name: 'CSS3', icon: 'css3' }, { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'nextjs' }, { name: 'Vue.js', icon: 'vuejs' }, { name: 'Nuxt', icon: 'nuxt' },
  ] },
  { label: 'Backend', lead: 'サーバー・API', items: [
    { name: 'Node.js', icon: 'nodejs' }, { name: 'Express', icon: 'express' }, { name: 'NestJS', icon: 'nestjs' }, { name: 'Python', icon: 'python' }, { name: 'Django', icon: 'django' },
    { name: 'PHP', icon: 'php' }, { name: 'Laravel', icon: 'laravel' }, { name: 'Ruby on Rails', icon: 'rails' },
  ] },
  { label: 'CMS / EC', lead: 'サイト構築・ネットショップ', items: [
    { name: 'WordPress', icon: 'wordpress' }, { name: 'Elementor', icon: 'elementor' }, { name: 'SWELL', icon: 'swell' }, { name: 'Wix', icon: 'wix' },
    { name: 'HubSpot CMS', icon: 'hubspot' }, { name: 'Shopify', icon: 'shopify' }, { name: 'makeshop', icon: 'makeshop' },
  ] },
  { label: 'Business System', lead: '業務システム・アプリ', items: [
    { name: 'Salesforce', icon: 'salesforce' }, { name: 'Account Engagement', icon: 'salesforce' }, { name: 'kintone', icon: 'kintone' },
    { name: 'Google Apps Script', icon: 'googleappsscript' }, { name: 'LINE LIFF', icon: 'line' }, { name: 'Flutter', icon: 'flutter' },
  ] },
  { label: '3D / XR', lead: '3D空間・メタバース', items: [
    { name: 'Unity', icon: 'unity' }, { name: 'C#', icon: 'csharp' }, { name: 'Photon Fusion 2', icon: 'photon' },
    { name: 'Photon Voice 2', icon: 'photon' }, { name: 'Three.js', icon: 'threejs' },
  ] },
  { label: 'AI / Automation', lead: 'AI活用・業務自動化', items: [
    { name: 'OpenAI API', icon: 'openai' }, { name: 'HeyGen API', icon: 'heygen' }, { name: 'Creatomate', icon: 'creatomate' },
    { name: 'Make', icon: 'make' }, { name: 'n8n', icon: 'n8n' }, { name: 'Zapier', icon: 'zapier' },
  ] },
];
