## Local Development Setup

### Android SDK Installation

1. **Verify Android SDK Installation**
    - Ensure that the Android SDK is correctly installed on your machine. You can verify its location by opening Android Studio and navigating to `File > Project Structure > SDK Location`.

2. **Set the ANDROID_HOME Environment Variable**
    - Define the `ANDROID_HOME` environment variable to point to the location of the Android SDK. This can usually be done in your system's environment settings or configuration files.

3. **Configure local.properties**
    - Ensure that the local.properties file (which contains the path to the Android SDK) is present in your project's root directory and properly configured.

*Example local.properties file:*
```sdk.dir=//path//to//your//android//sdk```

4. **Add local.properties to .gitignore**
   - Make sure that local.properties is added to your .gitignore file to prevent it from being committed to version control.

## Error handling.
In case of encountering the following error in *build process*

*Reason: Task ':expo-constants:packageDebugAssets' uses this output of task ':ex
po-constants:copyReleaseExpoConfig' without declaring an explicit or implicit depen
dency. This can lead to incorrect results being produced, depending on what order the tasks are executed.*
 
Add the following piece of code to ***afterEvaluate*** in **node_modules/expo-constants/android/build.gradle**

```
tasks.matching { it.name.startsWith('package') && it.name.endsWith('Assets') }.all {
     dependsOn ':expo-constants:copyDebugExpoConfig'
     mustRunAfter ':expo-constants:copyDebugExpoConfig', ':expo-constants:copyReleaseExpoConfig'
}
```

full example of afterEvaluate

```
afterEvaluate {
    publishing {
        publications {
            release(MavenPublication) {
               from components.release
            }    
        }
        repositories {
            maven {
               url = mavenLocal().url
            }
        }
    }
    tasks.matching { it.name.startsWith('package') && it.name.endsWith('Assets') }.all {
        dependsOn ':expo-constants:copyDebugExpoConfig'
        mustRunAfter ':expo-constants:copyDebugExpoConfig', ':expo-constants:copyReleaseExpoConfig'
    }
}
```