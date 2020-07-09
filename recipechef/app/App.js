import { createAppContainer } from "react-navigation";
import { createRootNavigator } from './Router'

/**
 * Methode om de router aan te spreken en in de appcontainer te plaatsen.
 */
export default createAppContainer(createRootNavigator());