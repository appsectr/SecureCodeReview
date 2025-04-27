public void importUserAccessPolicies(Menu menu) throws IOException {
    try {
        var path = consoleIO.readResponse("Select a JSON file containing user access policies:");
        if (path.isBlank()) {
            this.consoleIO.printLn("Please enter a valid JSON file path.");
            menu.accessPolicyMenuOptions();
            return;
        }
        String json = String.join("\n", Files.readAllLines(Path.of(path)));
        ObjectMapper objectMapper = new ObjectMapper();
        List<UserAccessPolicyDTO> accessPolicyList = objectMapper.readValue(json, new TypeReference<>() {});
        for (UserAccessPolicyDTO policy : accessPolicyList) {
            this.accessPolicyService.addPolicy(policy);
        }
    } catch (NoSuchFileException e) {
        this.consoleIO.printLn("Unable to find the specified JSON file.");
        menu.accessPolicyMenuOptions();
    } catch (Exception e) {
        this.consoleIO.printLn("The file contains invalid JSON or corrupted data.");
        menu.accessPolicyMenuOptions();
    }
    menu.accessPolicyMenuOptions();
}
