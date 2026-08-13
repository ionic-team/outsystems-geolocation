## [8.2.2](https://github.com/ionic-team/capacitor-geolocation/compare/v8.2.1...v8.2.2) (2026-08-13)


### Bug Fixes

* **android:** only apply kotlin-android plugin if not already applied ([#97](https://github.com/ionic-team/capacitor-geolocation/issues/97)) ([d7024ed](https://github.com/ionic-team/capacitor-geolocation/commit/d7024ed5b4d05bbb4df4fd7c0eeaa14c824c6837))

## [8.2.1](https://github.com/ionic-team/capacitor-geolocation/compare/v8.2.0...v8.2.1) (2026-08-06)


### Bug Fixes

* **android:** Only request permissions that are defined in the manifest ([#85](https://github.com/ionic-team/capacitor-geolocation/issues/85)) ([c9c4c84](https://github.com/ionic-team/capacitor-geolocation/commit/c9c4c8446efb1dacd71eaab2e9d52844ee5df020))
* **android:** Return error when user rejects request to turn on location with `enableLocationManagerFallback=true` ([#86](https://github.com/ionic-team/capacitor-geolocation/issues/86)) ([1a2504a](https://github.com/ionic-team/capacitor-geolocation/commit/1a2504a2b50f1793089bdbf029b010980d6dbcfa))
* improve location retrieval reliability ([f349a91](https://github.com/ionic-team/capacitor-geolocation/commit/f349a9181907815a989c491f6be519d24181d2b7))
* **ios:** Correct error when location services are off ([#94](https://github.com/ionic-team/capacitor-geolocation/issues/94)) ([d265bcb](https://github.com/ionic-team/capacitor-geolocation/commit/d265bcb17415dd48b73b4d2f400ffbbb9e8f97a2))

# [8.2.0](https://github.com/ionic-team/capacitor-geolocation/compare/v8.1.0...v8.2.0) (2026-03-31)


### Features

* add support for heading ([#78](https://github.com/ionic-team/capacitor-geolocation/issues/78)) ([ed20f3e](https://github.com/ionic-team/capacitor-geolocation/commit/ed20f3e3b77c9178b5ba2372a9d98c1759dae65d))

# [8.1.0](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0...v8.1.0) (2026-02-11)


### Bug Fixes

* **android:** AGP 9.0 no longer supporting `proguard-android.txt` ([#74](https://github.com/ionic-team/capacitor-geolocation/issues/74)) ([32961e1](https://github.com/ionic-team/capacitor-geolocation/commit/32961e1eb53106ba9004a9a1d0abb4b500a90dc8))


### Features

* **ci:** add Maven Central publishing workflow and Android publishing scripts ([#72](https://github.com/ionic-team/capacitor-geolocation/issues/72)) ([281d64f](https://github.com/ionic-team/capacitor-geolocation/commit/281d64fd038fbdfea15aa7a484ee0fb33370e35b))
* **ci:** add publish-pod job to invoke CocoaPods publish workflow ([#70](https://github.com/ionic-team/capacitor-geolocation/issues/70)) ([e2387f4](https://github.com/ionic-team/capacitor-geolocation/commit/e2387f43c060ee5f1e5e7210fe9c3ef13237f2a4))
* **ci:** add publish-pod job to invoke CocoaPods publish workflow ([#71](https://github.com/ionic-team/capacitor-geolocation/issues/71)) ([f9a4eca](https://github.com/ionic-team/capacitor-geolocation/commit/f9a4ecae97b944f739736ecc04f90b4c372232a5))

# [8.0.0](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.6...v8.0.0) (2025-12-08)


### Bug Fixes

* **android:** use 'propName = value' assignment syntax in build.gradle files ([08f311a](https://github.com/ionic-team/capacitor-geolocation/commit/08f311a1f785f04eab8eec87a60cd5147488388b))
* **ios:** added timeout implementation for both getCurrentPosition and watchPosition ([#55](https://github.com/ionic-team/capacitor-geolocation/issues/55)) ([4c22ac3](https://github.com/ionic-team/capacitor-geolocation/commit/4c22ac3c6facd4b628a38a668d66a7ea2f3ad44c))
* peerDependency for pnpm compatibility ([a94839d](https://github.com/ionic-team/capacitor-geolocation/commit/a94839d1c51d7db2bdc39d123121920f8d0b883b))


### Features

* **android:** Fallback option for no network or Play Services ([#53](https://github.com/ionic-team/capacitor-geolocation/issues/53)) ([09277b7](https://github.com/ionic-team/capacitor-geolocation/commit/09277b7cf458b1625db444f4eb0a40bd7c7b3265))
* **android:** New parameter `interval` in `watchPosition` ([#62](https://github.com/ionic-team/capacitor-geolocation/issues/62)) ([7fda0cf](https://github.com/ionic-team/capacitor-geolocation/commit/7fda0cf3f9de7254d67405689164c854ea09c84e))
* Capacitor 8 support ([6ead26a](https://github.com/ionic-team/capacitor-geolocation/commit/6ead26a06dbfa727551214a0a58469d5195d8657))


### BREAKING CHANGES

* The `timeout` property now gets applied to all requests on Android on iOS, as opposed to just web and `getCurrentPosition` on Android. This aligns with what is documented in the plugin. If you are experiencing timeouts when requesting location in your app, consider using a higher `timeout` value. For `watchPosition` on Android, you may use the `interval` parameter introduced in version 8.0.0.
* Capacitor major version update requires major version update on the plugin.

# [8.0.0-next.6](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.5...v8.0.0-next.6) (2025-11-26)


### Features

* **android:** New parameter `interval` in `watchPosition` ([#62](https://github.com/ionic-team/capacitor-geolocation/issues/62)) ([7fda0cf](https://github.com/ionic-team/capacitor-geolocation/commit/7fda0cf3f9de7254d67405689164c854ea09c84e))


### BREAKING CHANGES

* **android:** The `timeout` property now gets applied to all requests on Android on iOS, as opposed to just web and `getCurrentPosition` on Android. This aligns with what is documented in the plugin. If you are experiencing timeouts when requesting location in your app, consider using a higher `timeout` value. For `watchPosition` on Android, you may use the `interval` parameter introduced in version 8.0.0.

## [7.1.6](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.5...v7.1.6) (2025-11-25)


### Bug Fixes

* **ios:** Simplify SPM usage for native library ([#52](https://github.com/ionic-team/capacitor-geolocation/issues/52)) ([ad53dc6](https://github.com/ionic-team/capacitor-geolocation/commit/ad53dc654369db9c1c2ae57cefca798fc5283dc8))

# [8.0.0-next.7](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.6...v8.0.0-next.7) (2025-11-21)


### Features

* **android:** New parameter `interval` in `watchPosition` ([#62](https://github.com/ionic-team/capacitor-geolocation/issues/62)) ([7fda0cf](https://github.com/ionic-team/capacitor-geolocation/commit/7fda0cf3f9de7254d67405689164c854ea09c84e))

### BREAKING CHANGES

* The `timeout` property now gets applied to all requests on Android on iOS, as opposed to just web and `getCurrentPosition` on Android. This aligns with what is documented in the plugin. If you are experiencing timeouts when requesting location in your app, consider using a higher `timeout` value. For `watchPosition` on Android, you may use the `interval` parameter introduced in version 8.0.0.

# [8.0.0-next.6](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.5...v8.0.0-next.6) (2025-11-17)


* **android:** Update gradle dependencies to latest versions ([#61](https://github.com/ionic-team/capacitor-geolocation/pull/61))
* **ios:** Minor updates to Package.swift ([#60](https://github.com/ionic-team/capacitor-geolocation/pull/60))

# [8.0.0-next.5](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.4...v8.0.0-next.5) (2025-11-10)


### Bug Fixes

* **android:** use 'propName = value' assignment syntax in build.gradle files ([08f311a](https://github.com/ionic-team/capacitor-geolocation/commit/08f311a1f785f04eab8eec87a60cd5147488388b))

# [8.0.0-next.4](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.3...v8.0.0-next.4) (2025-11-04)


### Bug Fixes

* **ios:** added timeout implementation for both getCurrentPosition and watchPosition ([#55](https://github.com/ionic-team/capacitor-geolocation/issues/55)) ([4c22ac3](https://github.com/ionic-team/capacitor-geolocation/commit/4c22ac3c6facd4b628a38a668d66a7ea2f3ad44c))

# [8.0.0-next.3](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.2...v8.0.0-next.3) (2025-10-06)


### Features

* **android:** Fallback option for no network or Play Services ([#53](https://github.com/ionic-team/capacitor-geolocation/issues/53)) ([09277b7](https://github.com/ionic-team/capacitor-geolocation/commit/09277b7cf458b1625db444f4eb0a40bd7c7b3265))

# [8.0.0-next.2](https://github.com/ionic-team/capacitor-geolocation/compare/v8.0.0-next.1...v8.0.0-next.2) (2025-10-03)


### Bug Fixes

* **ios:** Simplify SPM usage for native library ([#52](https://github.com/ionic-team/capacitor-geolocation/issues/52)) ([ad53dc6](https://github.com/ionic-team/capacitor-geolocation/commit/ad53dc654369db9c1c2ae57cefca798fc5283dc8))

# [8.0.0-next.1](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.5...v8.0.0-next.1) (2025-09-09)


### Bug Fixes

* peerDependency for pnpm compatibility ([a94839d](https://github.com/ionic-team/capacitor-geolocation/commit/a94839d1c51d7db2bdc39d123121920f8d0b883b))


### Features

* Capacitor 8 support ([6ead26a](https://github.com/ionic-team/capacitor-geolocation/commit/6ead26a06dbfa727551214a0a58469d5195d8657))


### BREAKING CHANGES

* Capacitor major version update requires major version update on the plugin.

## [7.1.5](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.4...v7.1.5) (2025-08-12)

### Fixes

- **ios:** fixes an issue where the plugin stops receiving location updates after calling the clearWatch method. ([#38](https://github.com/ionic-team/capacitor-geolocation/pull/38))

## [7.1.4](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.3...7.1.4) (2025-07-15)

### Fixes

- **ios:** Swift package name to be consistent with previous versions ([#34](https://github.com/ionic-team/capacitor-geolocation/pull/34))
- **android** update Gradle and Kotlin configurations for compatibility with latest @capacitor/android ([#28](https://github.com/ionic-team/capacitor-geolocation/pull/28))

### Docs

- **ios** Add note about background usage description ([#29](https://github.com/ionic-team/capacitor-geolocation/pull/29))

## [7.1.3](https://github.com/ionic-team/capacitor-geolocation/compare/7.1.2...v7.1.3) (2025-06-26)

### Fixes

- **ios:** handle location watch callbacks recovery after backgrounding. More info [here](https://github.com/ionic-team/capacitor-geolocation/issues/19).
- Set dependency on @capacitor/synapse to 1.0.3 to fix ssr environments 

## [7.1.2](https://github.com/ionic-team/capacitor-geolocation/compare/7.1.1...7.1.2) (2025-02-21)

### Fixes

- **ios:** watchPosition after an error occurs
- **android** properly parsing number parameters

## [7.1.1](https://github.com/ionic-team/capacitor-geolocation/compare/v7.1.0...7.1.1) (2025-02-21)

### Fixes

- **ios:** properly resolving requestPermissions

# [7.1.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@7.1.0...@capacitor/geolocation@7.0.0) (2025-02-12)

### Chores

- Set peerDependency on @capacitor/core to >=7.0.0

### Features

- Revamp error messages and add error codes for better error-handling.
- Rewrite plugin using native Android and iOS libraries.

### Fixes

- **getCurrentPosition** on Android now uses uses the **timeout** parameter.
- **watchPosition** on Android now uses the **timeout** parameter to define the interval for position updates, and the **maximumAge** parameter for **setMaxUpdateAgeMillis**. More info [here](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.Builder#public-locationrequest.builder-setmaxupdateagemillis-long-maxupdateagemillis).

# [7.0.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@7.0.0-rc.0...@capacitor/geolocation@7.0.0) (2025-01-20)

**Note:** Version bump only for package @capacitor/geolocation

# [7.0.0-rc.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@7.0.0-alpha.2...@capacitor/geolocation@7.0.0-rc.0) (2025-01-13)

**Note:** Version bump only for package @capacitor/geolocation

# [7.0.0-alpha.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@7.0.0-alpha.1...@capacitor/geolocation@7.0.0-alpha.2) (2024-12-19)

**Note:** Version bump only for package @capacitor/geolocation

# [7.0.0-alpha.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.1...@capacitor/geolocation@7.0.0-alpha.1) (2024-12-16)

### Features

- **geolocation:** add `minimumUpdateInterval` parameter for `startWatch` ([#2272](https://github.com/ionic-team/capacitor-plugins/issues/2272)) ([c6ddc53](https://github.com/ionic-team/capacitor-plugins/commit/c6ddc53efb7eb2b3fc04fc9f2dc9660c9db1a464))

## [6.0.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0...@capacitor/geolocation@6.0.1) (2024-08-08)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-rc.1...@capacitor/geolocation@6.0.0) (2024-04-15)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-rc.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-rc.0...@capacitor/geolocation@6.0.0-rc.1) (2024-03-25)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-rc.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-beta.1...@capacitor/geolocation@6.0.0-rc.0) (2024-02-07)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-beta.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-beta.0...@capacitor/geolocation@6.0.0-beta.1) (2023-12-14)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-beta.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-alpha.2...@capacitor/geolocation@6.0.0-beta.0) (2023-12-13)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-alpha.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@6.0.0-alpha.1...@capacitor/geolocation@6.0.0-alpha.2) (2023-11-15)

**Note:** Version bump only for package @capacitor/geolocation

# [6.0.0-alpha.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.6...@capacitor/geolocation@6.0.0-alpha.1) (2023-11-08)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.6](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.5...@capacitor/geolocation@5.0.6) (2023-07-12)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.5](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.4...@capacitor/geolocation@5.0.5) (2023-06-29)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.4](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.3...@capacitor/geolocation@5.0.4) (2023-06-08)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.3](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.2...@capacitor/geolocation@5.0.3) (2023-06-08)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.1...@capacitor/geolocation@5.0.2) (2023-05-09)

**Note:** Version bump only for package @capacitor/geolocation

## [5.0.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.0...@capacitor/geolocation@5.0.1) (2023-05-05)

### Bug Fixes

- **android:** add appCompat libraries for maven releases ([#1577](https://github.com/ionic-team/capacitor-plugins/issues/1577)) ([8a2e0ea](https://github.com/ionic-team/capacitor-plugins/commit/8a2e0ea96538a46bde299a864dba760c6e2eba68))
- Use Capacitor 5 final ([#1574](https://github.com/ionic-team/capacitor-plugins/issues/1574)) ([139c18b](https://github.com/ionic-team/capacitor-plugins/commit/139c18b86a11d31246e952d1a74335ff8ce5dbc2))

# [5.0.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.0-beta.1...@capacitor/geolocation@5.0.0) (2023-05-03)

**Note:** Version bump only for package @capacitor/geolocation

# [5.0.0-beta.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.0-beta.0...@capacitor/geolocation@5.0.0-beta.1) (2023-04-21)

### Features

- Update gradle to 8.0.2 and gradle plugin to 8.0.0 ([#1542](https://github.com/ionic-team/capacitor-plugins/issues/1542)) ([e7210b4](https://github.com/ionic-team/capacitor-plugins/commit/e7210b47867644f5983e37acdbf0247214ec232d))

# [5.0.0-beta.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@5.0.0-alpha.1...@capacitor/geolocation@5.0.0-beta.0) (2023-03-31)

**Note:** Version bump only for package @capacitor/geolocation

# [5.0.0-alpha.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@4.1.0...@capacitor/geolocation@5.0.0-alpha.1) (2023-03-16)

### Bug Fixes

- **geolocation:** use LocationRequest builder instead of deprecated create ([#1483](https://github.com/ionic-team/capacitor-plugins/issues/1483)) ([7cfa12c](https://github.com/ionic-team/capacitor-plugins/commit/7cfa12c86807bd7434dbf907eb878f6796109fe9))

### Features

- **android:** Removing enableJetifier ([d66f9cb](https://github.com/ionic-team/capacitor-plugins/commit/d66f9cbd9da7e3b1d8c64ca6a5b45156867d4a04))

# [4.1.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.3.1...@capacitor/geolocation@4.1.0) (2022-11-16)

## 4.0.1 (2022-07-28)

# 4.0.0 (2022-07-27)

# 4.0.0-beta.2 (2022-07-08)

# 4.0.0-beta.0 (2022-06-27)

### Bug Fixes

- **geolocation:** reject checkPermissions / requestPermissions if location services are disabled ([#1053](https://github.com/ionic-team/capacitor-plugins/issues/1053)) ([774ec6e](https://github.com/ionic-team/capacitor-plugins/commit/774ec6e941193b1b06d07d31e6672340de532385))
- **geolocation:** stop location requests on pause ([#1018](https://github.com/ionic-team/capacitor-plugins/issues/1018)) ([eb24f25](https://github.com/ionic-team/capacitor-plugins/commit/eb24f2521d05dd25a2087a1de2b3e0644568cda0))

### Features

- set targetSDK default value to 31 ([#824](https://github.com/ionic-team/capacitor-plugins/issues/824)) ([3ee10de](https://github.com/ionic-team/capacitor-plugins/commit/3ee10de98067984c1a4e75295d001c5a895c47f4))
- set targetSDK default value to 32 ([#970](https://github.com/ionic-team/capacitor-plugins/issues/970)) ([fa70d96](https://github.com/ionic-team/capacitor-plugins/commit/fa70d96f141af751aae53ceb5642c46b204f5958))
- Upgrade gradle to 7.4 ([#826](https://github.com/ionic-team/capacitor-plugins/issues/826)) ([5db0906](https://github.com/ionic-team/capacitor-plugins/commit/5db0906f6264287c4f8e69dbaecf19d4d387824b))
- Use java 11 ([#910](https://github.com/ionic-team/capacitor-plugins/issues/910)) ([5acb2a2](https://github.com/ionic-team/capacitor-plugins/commit/5acb2a288a413492b163e4e97da46a085d9e4be0))

## [4.0.1](https://github.com/ionic-team/capacitor-plugins/compare/4.0.0...4.0.1) (2022-07-28)

**Note:** Version bump only for package @capacitor/geolocation

# [4.0.0](https://github.com/ionic-team/capacitor-plugins/compare/4.0.0-beta.2...4.0.0) (2022-07-27)

**Note:** Version bump only for package @capacitor/geolocation

# [4.0.0-beta.2](https://github.com/ionic-team/capacitor-plugins/compare/4.0.0-beta.0...4.0.0-beta.2) (2022-07-08)

**Note:** Version bump only for package @capacitor/geolocation

# 4.0.0-beta.0 (2022-06-27)

### Bug Fixes

- **geolocation:** reject checkPermissions / requestPermissions if location services are disabled ([#1053](https://github.com/ionic-team/capacitor-plugins/issues/1053)) ([774ec6e](https://github.com/ionic-team/capacitor-plugins/commit/774ec6e941193b1b06d07d31e6672340de532385))
- **geolocation:** stop location requests on pause ([#1018](https://github.com/ionic-team/capacitor-plugins/issues/1018)) ([eb24f25](https://github.com/ionic-team/capacitor-plugins/commit/eb24f2521d05dd25a2087a1de2b3e0644568cda0))
- add es2017 lib to tsconfig ([#180](https://github.com/ionic-team/capacitor-plugins/issues/180)) ([2c3776c](https://github.com/ionic-team/capacitor-plugins/commit/2c3776c38ca025c5ee965dec10ccf1cdb6c02e2f))
- correct addListeners links ([#655](https://github.com/ionic-team/capacitor-plugins/issues/655)) ([f9871e7](https://github.com/ionic-team/capacitor-plugins/commit/f9871e7bd53478addb21155e148829f550c0e457))
- inline source code in esm map files ([#760](https://github.com/ionic-team/capacitor-plugins/issues/760)) ([a960489](https://github.com/ionic-team/capacitor-plugins/commit/a960489a19db0182b90d187a50deff9dfbe51038))
- remove postpublish scripts ([#656](https://github.com/ionic-team/capacitor-plugins/issues/656)) ([ed6ac49](https://github.com/ionic-team/capacitor-plugins/commit/ed6ac499ebf4a47525071ccbfc36c27503e11f60))
- **geolocation:** Make getCurrentPosition return only once ([#470](https://github.com/ionic-team/capacitor-plugins/issues/470)) ([c5f1ceb](https://github.com/ionic-team/capacitor-plugins/commit/c5f1ceb790910b92e3f64d0b7fa8c85d48ea9841))
- **geolocation:** Replace deprecated call.save with new keepAlive API ([#375](https://github.com/ionic-team/capacitor-plugins/issues/375)) ([e4e7cf4](https://github.com/ionic-team/capacitor-plugins/commit/e4e7cf4afd4a70bf48359c625fa7a548211876d5))
- **geolocation:** return cached location if newer than maximumAge ([#639](https://github.com/ionic-team/capacitor-plugins/issues/639)) ([7b08eea](https://github.com/ionic-team/capacitor-plugins/commit/7b08eea9729bbf2b2b6b881cc81389cf108b3a2c))
- **geolocation:** Use the new APIs for handling/saving calls ([#374](https://github.com/ionic-team/capacitor-plugins/issues/374)) ([ebd5b52](https://github.com/ionic-team/capacitor-plugins/commit/ebd5b527cb7f8b6c0016e82d03a0e84287913d3e))
- support deprecated types from Capacitor 2 ([#139](https://github.com/ionic-team/capacitor-plugins/issues/139)) ([2d7127a](https://github.com/ionic-team/capacitor-plugins/commit/2d7127a488e26f0287951921a6db47c49d817336))

### Features

- set targetSDK default value to 31 ([#824](https://github.com/ionic-team/capacitor-plugins/issues/824)) ([3ee10de](https://github.com/ionic-team/capacitor-plugins/commit/3ee10de98067984c1a4e75295d001c5a895c47f4))
- set targetSDK default value to 32 ([#970](https://github.com/ionic-team/capacitor-plugins/issues/970)) ([fa70d96](https://github.com/ionic-team/capacitor-plugins/commit/fa70d96f141af751aae53ceb5642c46b204f5958))
- Upgrade gradle to 7.4 ([#826](https://github.com/ionic-team/capacitor-plugins/issues/826)) ([5db0906](https://github.com/ionic-team/capacitor-plugins/commit/5db0906f6264287c4f8e69dbaecf19d4d387824b))
- Use java 11 ([#910](https://github.com/ionic-team/capacitor-plugins/issues/910)) ([5acb2a2](https://github.com/ionic-team/capacitor-plugins/commit/5acb2a288a413492b163e4e97da46a085d9e4be0))
- **android:** implements Activity Result API changes for permissions and activity results ([#222](https://github.com/ionic-team/capacitor-plugins/issues/222)) ([f671b9f](https://github.com/ionic-team/capacitor-plugins/commit/f671b9f4b472806ef43db6dcf302d4503cf1828c))
- **geolocation:** Add new alias for coarse location ([#684](https://github.com/ionic-team/capacitor-plugins/issues/684)) ([7563040](https://github.com/ionic-team/capacitor-plugins/commit/7563040983ad397e28616246e7ed5ffce69727c2))
- **geolocation:** Error if Google Play Services are not available ([#709](https://github.com/ionic-team/capacitor-plugins/issues/709)) ([fc79c43](https://github.com/ionic-team/capacitor-plugins/commit/fc79c4319c54cbcd5dbbb7221dfdd03d0515805b))
- **geolocation:** Throw error if location is disabled ([#589](https://github.com/ionic-team/capacitor-plugins/issues/589)) ([14724c5](https://github.com/ionic-team/capacitor-plugins/commit/14724c5ec5b23bf94f6f3511bbe204482768d10f))
- add commonjs output format ([#179](https://github.com/ionic-team/capacitor-plugins/issues/179)) ([8e9e098](https://github.com/ionic-team/capacitor-plugins/commit/8e9e09862064b3f6771d7facbc4008e995d9b463))
- Geolocation plugin ([#13](https://github.com/ionic-team/capacitor-plugins/issues/13)) ([911ae71](https://github.com/ionic-team/capacitor-plugins/commit/911ae71e6aef4cfa9fb3ab5b0c13f3c06ef6b15c))

## [1.3.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.3.0...@capacitor/geolocation@1.3.1) (2022-01-19)

### Bug Fixes

- inline source code in esm map files ([#760](https://github.com/ionic-team/capacitor-plugins/issues/760)) ([a960489](https://github.com/ionic-team/capacitor-plugins/commit/a960489a19db0182b90d187a50deff9dfbe51038))

# [1.3.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.2.0...@capacitor/geolocation@1.3.0) (2021-12-08)

### Features

- **geolocation:** Error if Google Play Services are not available ([#709](https://github.com/ionic-team/capacitor-plugins/issues/709)) ([fc79c43](https://github.com/ionic-team/capacitor-plugins/commit/fc79c4319c54cbcd5dbbb7221dfdd03d0515805b))

# [1.2.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.1.3...@capacitor/geolocation@1.2.0) (2021-11-17)

### Features

- **geolocation:** Add new alias for coarse location ([#684](https://github.com/ionic-team/capacitor-plugins/issues/684)) ([7563040](https://github.com/ionic-team/capacitor-plugins/commit/7563040983ad397e28616246e7ed5ffce69727c2))

## [1.1.3](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.1.2...@capacitor/geolocation@1.1.3) (2021-11-03)

**Note:** Version bump only for package @capacitor/geolocation

## [1.1.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.1.1...@capacitor/geolocation@1.1.2) (2021-10-14)

### Bug Fixes

- remove postpublish scripts ([#656](https://github.com/ionic-team/capacitor-plugins/issues/656)) ([ed6ac49](https://github.com/ionic-team/capacitor-plugins/commit/ed6ac499ebf4a47525071ccbfc36c27503e11f60))

## [1.1.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.1.0...@capacitor/geolocation@1.1.1) (2021-10-13)

### Bug Fixes

- correct addListeners links ([#655](https://github.com/ionic-team/capacitor-plugins/issues/655)) ([f9871e7](https://github.com/ionic-team/capacitor-plugins/commit/f9871e7bd53478addb21155e148829f550c0e457))
- **geolocation:** return cached location if newer than maximumAge ([#639](https://github.com/ionic-team/capacitor-plugins/issues/639)) ([7b08eea](https://github.com/ionic-team/capacitor-plugins/commit/7b08eea9729bbf2b2b6b881cc81389cf108b3a2c))

# [1.1.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.0.2...@capacitor/geolocation@1.1.0) (2021-09-01)

### Features

- **geolocation:** Throw error if location is disabled ([#589](https://github.com/ionic-team/capacitor-plugins/issues/589)) ([14724c5](https://github.com/ionic-team/capacitor-plugins/commit/14724c5ec5b23bf94f6f3511bbe204482768d10f))

## [1.0.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.0.1...@capacitor/geolocation@1.0.2) (2021-06-23)

### Bug Fixes

- **geolocation:** Make getCurrentPosition return only once ([#470](https://github.com/ionic-team/capacitor-plugins/issues/470)) ([c5f1ceb](https://github.com/ionic-team/capacitor-plugins/commit/c5f1ceb790910b92e3f64d0b7fa8c85d48ea9841))

## [1.0.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@1.0.0...@capacitor/geolocation@1.0.1) (2021-06-09)

**Note:** Version bump only for package @capacitor/geolocation

# [1.0.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.7...@capacitor/geolocation@1.0.0) (2021-05-19)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.7](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.6...@capacitor/geolocation@0.4.7) (2021-05-11)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.6](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.5...@capacitor/geolocation@0.4.6) (2021-05-10)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.5](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.4...@capacitor/geolocation@0.4.5) (2021-05-07)

### Bug Fixes

- **geolocation:** Replace deprecated call.save with new keepAlive API ([#375](https://github.com/ionic-team/capacitor-plugins/issues/375)) ([e4e7cf4](https://github.com/ionic-team/capacitor-plugins/commit/e4e7cf4afd4a70bf48359c625fa7a548211876d5))
- **geolocation:** Use the new APIs for handling/saving calls ([#374](https://github.com/ionic-team/capacitor-plugins/issues/374)) ([ebd5b52](https://github.com/ionic-team/capacitor-plugins/commit/ebd5b527cb7f8b6c0016e82d03a0e84287913d3e))

## [0.4.4](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.3...@capacitor/geolocation@0.4.4) (2021-04-29)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.3](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.2...@capacitor/geolocation@0.4.3) (2021-03-10)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.1...@capacitor/geolocation@0.4.2) (2021-03-02)

**Note:** Version bump only for package @capacitor/geolocation

## [0.4.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.4.0...@capacitor/geolocation@0.4.1) (2021-02-27)

**Note:** Version bump only for package @capacitor/geolocation

# [0.4.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.3.2...@capacitor/geolocation@0.4.0) (2021-02-10)

### Features

- **android:** implements Activity Result API changes for permissions and activity results ([#222](https://github.com/ionic-team/capacitor-plugins/issues/222)) ([f671b9f](https://github.com/ionic-team/capacitor-plugins/commit/f671b9f4b472806ef43db6dcf302d4503cf1828c))

## [0.3.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.3.1...@capacitor/geolocation@0.3.2) (2021-02-05)

**Note:** Version bump only for package @capacitor/geolocation

## [0.3.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.3.0...@capacitor/geolocation@0.3.1) (2021-01-26)

**Note:** Version bump only for package @capacitor/geolocation

# [0.3.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.2.0...@capacitor/geolocation@0.3.0) (2021-01-14)

**Note:** Version bump only for package @capacitor/geolocation

# [0.2.0](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.1.3...@capacitor/geolocation@0.2.0) (2021-01-13)

### Bug Fixes

- add es2017 lib to tsconfig ([#180](https://github.com/ionic-team/capacitor-plugins/issues/180)) ([2c3776c](https://github.com/ionic-team/capacitor-plugins/commit/2c3776c38ca025c5ee965dec10ccf1cdb6c02e2f))

### Features

- add commonjs output format ([#179](https://github.com/ionic-team/capacitor-plugins/issues/179)) ([8e9e098](https://github.com/ionic-team/capacitor-plugins/commit/8e9e09862064b3f6771d7facbc4008e995d9b463))

## [0.1.3](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.1.2...@capacitor/geolocation@0.1.3) (2021-01-13)

**Note:** Version bump only for package @capacitor/geolocation

## [0.1.2](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.1.1...@capacitor/geolocation@0.1.2) (2021-01-08)

**Note:** Version bump only for package @capacitor/geolocation

## [0.1.1](https://github.com/ionic-team/capacitor-plugins/compare/@capacitor/geolocation@0.1.0...@capacitor/geolocation@0.1.1) (2020-12-27)

**Note:** Version bump only for package @capacitor/geolocation

# 0.1.0 (2020-12-20)

### Bug Fixes

- support deprecated types from Capacitor 2 ([#139](https://github.com/ionic-team/capacitor-plugins/issues/139)) ([2d7127a](https://github.com/ionic-team/capacitor-plugins/commit/2d7127a488e26f0287951921a6db47c49d817336))

### Features

- Geolocation plugin ([#13](https://github.com/ionic-team/capacitor-plugins/issues/13)) ([911ae71](https://github.com/ionic-team/capacitor-plugins/commit/911ae71e6aef4cfa9fb3ab5b0c13f3c06ef6b15c))
