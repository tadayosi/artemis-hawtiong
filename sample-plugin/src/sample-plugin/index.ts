import { HawtioPlugin, configManager } from '@hawtio/react'
import { artemis } from './artemis'
import { customTree } from './custom-tree'
import { simple } from './simple'

/**
 * The entry function for the plugin exposed to Hawtio.
 *
 * The default name for the function is "plugin". If you want to use the name other
 * than the default one, you need to specify the name using {HawtioPlugin#pluginEntry()}
 * method when registering the plugin to JMX MBean server.
 *
 * <code>
 * new HawtioPlugin()
 *     .pluginEntry("registerMyPlugin");
 * </code>
 *
 * @see src/main/java/io/hawt/examples/sampleplugin/PluginContextListener.java
 */
export const plugin: HawtioPlugin = () => {
  simple()
  customTree()
  artemis()
}

// Register the custom plugin version to Hawtio
// See package.json "replace-version" script for how to replace the version placeholder with a real version
configManager.addProductInfo('Hawtio Sample Plugin', '__PACKAGE_VERSION_PLACEHOLDER__')
