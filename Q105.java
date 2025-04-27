public void importUserAccessPolicies(InputStream jsonInputStream, Menu menu) throws IOException {
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        List<UserAccessPolicyDTO> accessPolicyList = objectMapper.readValue(jsonInputStream, new TypeReference<>() {});
        for (UserAccessPolicyDTO policy : accessPolicyList) {
            this.accessPolicyService.addPolicy(policy);
        }
    } catch (Exception e) {
        consoleIO.printLn("Error importing policies.");
    }

    menu.accessPolicyMenuOptions();
}
